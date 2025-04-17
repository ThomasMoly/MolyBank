import React, { useEffect, useState } from 'react'
import '../CSS/TVShows.css'
import Search from '../components/search'
import Spinner from '../components/Spinner'
import TVCard from '../components/TVCard'
import { useDebounce } from 'use-debounce'
import { updateSearchCount, getTrendingShows} from '../appwrite_TV.js'

const TVShows = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMSG, setErrorMSG] = useState('')
  const [tvList, setTVList] = useState([])//UseState for setting up the array of movies
  const [isLoading, setIsLoading] = useState(false)// UseState for beginning the loading process
  const [debounceSearchTerm] = useDebounce(searchTerm, 1000);
  const [trendingShows, setTrendingShows] = useState([])
  

  const API_BASE_URL = 'https://api.themoviedb.org/3'

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
    };

    const fetchTVShows = async(query = '') => {
      try {
        setErrorMSG('')
        setIsLoading(true)

        const endpoint = query ? `${API_BASE_URL}/search/tv?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/tv?sort_by=popularity.desc`
        const response = await fetch(endpoint, options)
        
        if(!response.ok){
          throw new error('Error in the response')
        }

        const data = await response.json()

        console.log(data)

        if (data.Response === 'False') {
          setErrorMessage(data.Error || 'Error fetching movies.')
          setTVList([])
          return;
      }

      setTVList(data.results || [])
      
      if (query && data.results.length > 0) {
            await updateSearchCount(query, data.results[0])
          }

      } catch (error) {
        console.error(error)
        setErrorMSG('Error in fetching the TVShows. P.lease try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    const loadTrendingShows = async () => {
          try {
            const tv = await getTrendingShows()
            
            setTrendingShows(tv.documents)
          } catch (error) {
            console.error(`Error fetching trending movies: ${error}`)
          }
        }

    useEffect(() => {
      fetchTVShows(debounceSearchTerm)
    }, [debounceSearchTerm])

     useEffect(() => {
          loadTrendingShows()
        }, [])

  return (
    <main>
      <div className="patternG"/>
      <div className="wrapper">
        <header>
          <img src='../TV-img.png' alt='hero'/>

            <h1>Find <span className="text-gradient2">TVshows</span> You'll Enjoy Without The Hassle</h1>
            <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />  

        </header>

          {trendingShows.length > 0 && (
                <section className='trending'>
                  <h2>
                    Trending Shows
                  </h2>

                  <ul>
                    {trendingShows.map((tv, index) =>(
                     <li key={tv.$id}>
                      <p>{index + 1}</p>
                      <img src={tv.poster_URL} alt={tv.title}/>
                     </li> 
                    ))}
                  </ul>
                </section>
              )}

        <section className='all-movies'>
              <h2>
                All Movies
              </h2>
              {isLoading ? (
                <Spinner/>
              ) : errorMSG ? (
                <p className='text-red-500'>{errorMessage}</p>
              ) : (
                <ul>
                  {tvList.map((tv) => (
                   <TVCard key={tv.id} tv={tv}/>
                  ))}
                </ul>
              )}

            </section>
      </div>
    </main>
  )
}

export default TVShows
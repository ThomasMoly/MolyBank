import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { useParams, useLocation } from 'react-router-dom'
import '../CSS/Desc.css'


const Desc = () => {
    const params = useParams()
    const location = useLocation();

    const [data] = useState(location.state || {})

    const {title, vote_average, poster_path, release_date, original_language, id, genre_ids, popularity, overview, backdrop_path} = data || {};

    const map1 = new Map([
      [28, "Action"],
      [12, "Adventure"],
      [16, "Animation"],
      [35, "Comedy"],
      [80, "Crime"],
      [99, "Documentary"],
      [18, "Drama"],
      [10751, "Family"],
      [14, "Fantasy"],
      [36, "History"],
      [27, "Horror"],
      [10402, "Music"],
      [9648, "Mystery"],
      [10749, "Romance"],
      [878, "Science Fiction"],
      [10770, "TV Movie"],
      [53, "Thriller"],
      [37, "Western"],
      [10752, "War"],
    ]);

    const genre = new Map()

    console.log(genre_ids)

    genre_ids.forEach((id) => {
      const genreName = map1.get(id);
      genre.set(id, genreName);
    })

  return (
    <main>
        <NavBar/>
        <div className='movie-card'>
        <div className='img-container'>
            <img className = 'img' src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`: 'no-movie.png'
             } alt={title}/>
             <div className='info'>
             <div className='rating gradient-text'>
             <p className='Title'>Title: {title}</p>
             <div className='r-next'>
             <p className="next">
              <img src="/star.svg" alt="star icon" />
               {vote_average ? vote_average.toFixed(1) : 'N/A'} 
             </p>
             </div>
             </div>
             {Array.from(genre.values()).map((value, index) => (
              <p className = 'genre' key={index}>{value}</p>
              ))}
              <p className='overview gradient-text'>Overview: <span className='align'>{overview}</span></p>
              <p className='lang gradient-text'>Language: {original_language}</p>
              <p className='year gradient-text'>Release Date: {release_date ? release_date : 'N/A'}</p>
              <p className='popularity gradient-text'>Popularity: {popularity.toFixed() >= 1000 ? 'Most Popular' : popularity.toFixed() < 1000 & popularity.toFixed() > 300 ? 'Popular' : popularity.toFixed()< 300 & popularity.toFixed() > 100 ? 'Somewhat Popular' : 'Not Popular'} </p>
              <img className = 'wide bg-center' src={backdrop_path ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`: 'no-movie.png'
              } alt={title}/>
             </div>
        </div>
        <div className='content'>
          
        </div>
        </div>
    </main>
  )
}

export default Desc
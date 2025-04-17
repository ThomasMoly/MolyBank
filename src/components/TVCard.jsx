import React from 'react'

const TVCard = ({tv : {name, vote_average, poster_path, first_air_date, original_language}, }) => {
  return (
    <div className='movie-card'>
         <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`: 'no-movie.png'
         } alt={name}/>

         <div className='mt-4'>
         <p className='text-white text-2xl font-semibold'>{name}</p>
            <div className='content'>
                <div className='rating'>
                    <img src="star.svg" alt="star icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    <span>•</span>
                    <p className='lang-white'>{original_language}</p>
                    <span>•</span>
                    <p className='year-white'>{first_air_date ? first_air_date : 'N/A'}</p>

                </div>
            </div>
         </div>
    </div>
  )
}

export default TVCard
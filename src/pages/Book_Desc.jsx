import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { useLocation, useParams } from 'react-router-dom'
import '../CSS/Desc.css'


const Book_Desc = () => {
  const params = useParams()
  const location = useLocation()

  const [data] = useState(location.state || {})

  const {id, volumeInfo: {title, publishedDate, language, averageRating, imageLinks, authors, categories, infoLink, description} = {},saleInfo: {retailPrice,} = {},} = data || {};

  const thumbnail = imageLinks?.smallThumbnail
  const amount = retailPrice?.amount

  console.log(data)
  return (
    <main>
      <NavBar/>
      <div className='movie-card'>
        <div className='img-container'>
          <img className = 'img' src={thumbnail ? `${thumbnail}`: 'no-movie.png'
          } alt={title}/>
          <div className='info'>
            <div className='rating gradient-text'>
              <p className='Title'>Title: {title}</p>
              <div className='r-next'>
                <p className="next">
                  <img src="/star.svg" alt="star icon" />
                  {averageRating ? averageRating.toFixed(1) : 'N/A'}
                </p>
              </div>
              </div>
              
              {categories.map((value, index) => (
                <p key={index} className='genre'>
                  {value}
                </p>
              ))}
              <p className='overview gradient-text'>Overview: <span className='align'>{ description.split('.')[3] + description.split('.')[4] + description.split('.')[5] + description.split('.')[6]}</span></p>

              <p className='lang gradient-text'>Language: {language}</p>
              <p className='year gradient-text'>Published Date: {publishedDate ? publishedDate.split('-')[0] : 'N/A'}</p>
              <p className='price gradient-text'>Price: {amount ? `$${amount}` : 'N/A'}</p> 
              <p className='author gradient-text'>Author: {authors ? authors.join(', ') : 'N/A'}</p>
          </div>
          </div>
        </div>
    </main>
  )
}

export default Book_Desc
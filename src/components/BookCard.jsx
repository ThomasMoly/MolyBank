import React from 'react'
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
    const {
      id,
      volumeInfo: {
        title,
        publishedDate,
        language,
        ratingsCount,
        imageLinks,
        authors,
      } = {},
      saleInfo: {
        retailPrice,
      } = {},
    } = book || {}; // fallback if book is somehow undefined
  
    const thumbnail = imageLinks?.thumbnail;
    const amount = retailPrice?.amount;
  
  return (
    <div className='movie-card'>
        <img src={thumbnail ? `${thumbnail}`: 'no-movie.png'
         } alt={title}/>

         <div className='mt-4'>
         <li className='text-white text-2xl font-semibold'>{title}</li>
         <div className='content'>
                <div className='rating'>
                    <p>{amount ? `$${amount}` : 'N/A'}</p>
                    <span>•</span>
                    <p className='lang-white'>{language}</p>
                    <span>•</span>
                    <p className='year-white'>{publishedDate ? publishedDate.split('-')[0] : 'N/A'}</p>
                    <span>•</span>
                    <Link to = {`/Book_Desc/${id}`}className='button' state={book}>
                      MoreInfo
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BookCard
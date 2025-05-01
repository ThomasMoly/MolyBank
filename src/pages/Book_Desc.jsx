import React, { useState, useContext, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { useLocation, useParams } from 'react-router-dom'
import '../CSS/Desc.css'
import { writeComment, getComments } from '../appwrite/appwrite_Desc_Book'
import { UserContext } from '../components/user'


const Book_Desc = () => {
  const params = useParams()
  const location = useLocation()

  const { user } = useContext(UserContext);

  const [comment, setComment] = useState('')
  const [showComment, setShowComment] = useState([])
  const [show, setShow] = useState(0)
  

  const [data] = useState(location.state || {})

  const {id, volumeInfo: {title, publishedDate, language, averageRating, imageLinks, authors, categories, infoLink, description} = {},saleInfo: {retailPrice,} = {},} = data || {};

  const thumbnail = imageLinks?.smallThumbnail
  const amount = retailPrice?.amount

  const handleCommentChange = (event) => {
        const comments = event.target.value;
        
        setComment(comments);
      }
  
      const handleFormSubmit = (event) => {
        event.preventDefault(); // stops the page from reloading
      }
      
      const handleSubmit = async() => {
        try {
          if(user){
            await writeComment(comment, id, user.name); 
            setComment(''); // Clear the comment input after submission
            handleShowComment(); // Refresh the comments after submission
            setShow(prev => prev + 1); // Toggle the show state to trigger re-rendering
          }
          else{
            alert('Please login to comment')
          }
        } catch (error) {
          console.error(error);
        }
    };
  
      const handleShowComment = async () => {
        const displayComment = await getComments();
        const filteredComments = displayComment.documents.filter((comment) => comment.Id === id);
        setShowComment(filteredComments);
      }
  
    useEffect(() => {
      handleShowComment()
    }, [show])
  

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
          <div className='comment-container'>
        <h2>Comments</h2>
              <form onSubmit={handleFormSubmit}>
              <div className='comment-sumbit'>
                <textarea id="comment" name="" rows="1" cols="1" placeholder="Write a comment..." value={comment} onChange={handleCommentChange}/>
                <button type="submit" className='submit-button' onClick={handleSubmit}>Submit </button>
              </div>
              </form>
              {
                showComment.map((comment, id) => {
                  return (
                  <div className = 'comment-container ' key={id}>
                    <p className='comment-user gradient-text'>{comment.username}</p>
                    <p className='comment-box '>{comment.comment}</p>
                </div>
                )})
              }
        </div>
        </div>
    </main>
  )
}

export default Book_Desc
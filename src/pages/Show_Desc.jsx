import React, { useState, useEffect, useContext } from 'react'
import NavBar from '../components/NavBar'
import { useLocation, useParams } from 'react-router-dom'
import { writeComment, getComments } from '../appwrite/appwrite_Desc'
import { UserContext } from '../components/user'

const Show_Desc = () => {
  const props = useParams()
  const location = useLocation()

  const { user } = useContext(UserContext);
  
  const [comment, setComment] = useState('')
  const [showComment, setShowComment] = useState([])
  const [show, setShow] = useState(0)

  const [data] = useState(location.state || {})

  const {name, vote_average, poster_path, first_air_date, original_language, id, genre_ids, popularity, overview, backdrop_path} = data || {};

  const map1 = new Map([
    [10759, "10759"],
    [16, "Animation"],
    [35, "Comedy"],
    [80, "Crime"],
    [99, "Documentary"],
    [18, "Drama"],
    [10751, "Family"],
    [10762, "Kids"],
    [9648, "Mystery"],
    [10763, "News"],
    [10764, "Reality"],
    [10765, "Sci-Fi & Fantasy"],
    [10766, "Soap"],
    [10767, "Talk"],
    [37, "Western"],
    [10768, "War & Politics"],
  ]);
  const genre = new Map()

  console.log(genre_ids)

  genre_ids.forEach((id) => {
    const genreName = map1.get(id);
    genre.set(id, genreName);
  })

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
        const filteredComments = displayComment.documents.filter((comment) => comment.id === id);
        console.log(filteredComments)
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
          <img className = 'img' src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`: 'no-movie.png'
           } alt={name}/>
           <div className='info'>
           <div className='rating gradient-text'>
           <p className='Title'>Title: {name}</p>
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
            <p className='year gradient-text'>First Air Date: {first_air_date ? first_air_date : 'N/A'}</p>
            <p className='popularity gradient-text'>Popularity: {popularity.toFixed() >= 1000 ? 'Most Popular' : popularity.toFixed() < 1000 & popularity.toFixed() > 300 ? 'Popular' : popularity.toFixed()< 300 & popularity.toFixed() > 100 ? 'Somewhat Popular' : 'Not Popular'} </p>
            <img className = 'wide bg-center' src={backdrop_path ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`: 'no-movie.png'
            } alt={name}/>
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

export default Show_Desc
import React, { useEffect, useState } from 'react'
import Post from "../Post/Post"
import { Container } from '@mui/material';

import "./Home.css";
const Home = () => {
  const [error,setError] = useState(null);
  const [isLoaded,setIsLoaded] = useState(false);
  const [postList,setPostList] = useState([]);

  useEffect( () => {
      fetch("/posts")
      .then(res => res.json())
      .then(
          (result) => {
              setIsLoaded(true);
              setPostList(result);
          },
          (error ) => {
              setIsLoaded(true);
              setError(error);
          }
      )
  } , [])

  if(error){
      return <div>Error !!</div>;
  }else if (!isLoaded) {
      return <div>Loading .. </div>;
  } else {
      return (
        <Container className='container' maxWidth="lg" sx={{ mt: 4, mb: 4, p: 4 }}> 
                {postList.map((post) => (
                    <Post key={post.id}
                    userId={post.userId}
                    userName={post.userName}
                    title={post.title} 
                    text={post.text} 
                     /> // Use post.id as unique key
                ))}
            </Container>
      );
  }

}

export default Home
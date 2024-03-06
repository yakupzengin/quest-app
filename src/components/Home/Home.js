import React, { useEffect, useState } from 'react'
import Post from "../Post/Post"

import "./Home.css";
import PostForm from '../Post/PostForm';
const Home = () => {
  const [error,setError] = useState(null);
  const [isLoaded,setIsLoaded] = useState(false);
  const [postList,setPostList] = useState([]);

//   const refreshPost = () => {
//     fetch("/posts")
//     .then(res => res.json())
//     .then(
//         (result) => {
//             setIsLoaded(true);
//             setPostList(result);
//         },
//         (error ) => {
//             setIsLoaded(true);
//             setError(error);
//         }
//     )
//   }
const refreshPost = async () => {
    try {
      const response = await fetch('/posts');
      const result = await response.json();
      setIsLoaded(true);
      setPostList(result.reverse()); // Reverse the fetched posts
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  };
  
  useEffect( () => {
    refreshPost();
  } , [postList])


  if(error){
      return <div>Error !!</div>;
  }else if (!isLoaded) {
      return <div>Loading .. </div>;
  } else {
      return (
        <class className='container' maxWidth="lg" sx={{ mt: 0, mb: 0, pt: 0 }}> 
                <PostForm userId={1} userName={"username1"} refreshPost={refreshPost} />
                {postList.map((post) => (
                    <Post key={post.id}
                    postId= {post.id}
                    userId={1}
                    userName={post.userName}
                    title={post.title} 
                    text={post.text} 
                    likes = {post.postLikes}
                     /> // Use post.id as unique key
                ))}
            </class>
      );
  }

}

export default Home
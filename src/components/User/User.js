import React from 'react'
import {useParams} from "react-router-dom"
export const User = () => {
    const {userId} = useParams();
  return (
    <div > USER : {userId}</div>
  )
}
export default User;

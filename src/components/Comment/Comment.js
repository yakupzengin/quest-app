import React from 'react'
import CardContent from '@mui/material/CardContent';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import "./comment.css"
import { ColorLens } from '@mui/icons-material';
const Comment = (props) => {
    const{userId,userName,text} = props


    return (
        <>
            <CardContent className='comment-container'>
            <OutlinedInput
                        id="outlined-adornment-amount"
                        disabled
                        multiline
                        placeholder="Title"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={text}
                        startAdornment ={
                            <InputAdornment  >
                            <Link className='comment-link' to={{ pathname: "/users/" + userId }}  >
                            <Avatar className='comment-avatar' sx={{ bgcolor: red[500] , marginRight:"20px",color:"white"}} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                             </InputAdornment>     
                        }
                    >
                    </OutlinedInput>

            </CardContent>
        
        </>
    )
}

export default Comment
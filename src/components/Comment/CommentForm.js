import React, { useState } from 'react'
import CardContent from '@mui/material/CardContent';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import "./comment.css"
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


const CommentForm = (props) => {
    const{userId,userName,postId} = props
    const [text,setText] = useState("");


    const saveComment = () => {
        fetch("/comments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId: postId,
                    userId: userId,
                    text:text
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error "))
    }


    const handleSubmit = () => {
        saveComment();
        setText("")
    }
    const handleText = (value) => {
        setText(value)
    }
    return (
        <>
            <CardContent className='comment-container'>
            <OutlinedInput
                        id="outlined-adornment-amount"
                        multiline
                        placeholder="Add comment"
                        inputProps={{ maxLength: 250 }}
                        fullWidth
                        value={text}
                        onChange={(input) => handleText(input.target.value)}
                        endAdornment={<InputAdornment
                            position="end">
                            <Button
                                size="small"
                                variant="contained"
                                endIcon={<SendIcon />}
                                style={{ background: "linear-gradient(45deg , #2196F3 30%, #21CBF3 90%)" }}
                                onClick={handleSubmit}>
                                Send
                            </Button>
                        </InputAdornment>}

                        startAdornment ={
                            <InputAdornment  >
                            <Link className='comment-link' to={{ pathname: "/users/" + userId }}  >
                            <Avatar className='comment-avatar' sx={{ bgcolor: red[500] , marginRight:"20px",color:"white"}} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                        
                             </InputAdornment>     
                        }>
                    </OutlinedInput>

            </CardContent>
        
        </>
    )
}

export default CommentForm;
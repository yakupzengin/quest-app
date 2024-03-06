import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "./Post.css"
import { Link } from "react-router-dom";



function PostForm(props) {
    const { userId, userName, refreshPost } = props;
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);


    const savePost = () => {
        fetch("/posts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    userId: userId,
                    text: text
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error "))
    }


    const handleSubmit = () => {
        savePost();
        setIsSent(true)
        setText("")
        setTitle("")
        refreshPost();
    }

    const handleTitle = (value) => {
        setTitle(value)
        setIsSent(false)
    }
    const handleText = (value) => {
        setText(value)
        setIsSent(false)

    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSent(false);
    };

 
    return (
        <div className="post-container">
            <Snackbar 
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={isSent}
            autoHideDuration={4000} 
            onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    The post was shared successfully.
                </Alert>
            </Snackbar>


            <Card className="card" sx={{ width: 800 }}>
                <CardHeader className="card-header"
                    avatar={
                        <Link className='links' to={{ pathname: "/users/" + userId }}  >User
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }

                    title={<OutlinedInput
                        id="outlined-adornment-amount"
                        multiline
                        placeholder="Title"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={title}
                        onChange={(input) => handleTitle(input.target.value)}
                    >

                    </OutlinedInput>}
                />
                <CardContent CardContent >
                    <Typography variant="body2" color="text.secondary">
                        {<OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Text"
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
                            </InputAdornment>}>
                        </OutlinedInput>}
                    </Typography>
                </CardContent >

            </Card >
        </div >
    )
}
export default PostForm
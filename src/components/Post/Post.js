import React, { useState, useEffect, useRef } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import "./Post.css"
import { Link } from "react-router-dom";
import Container from '@mui/material/Container';
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function Post(props) {
    const { userId, userName, title, text, postId ,likes} = props;
    const [expanded, setExpanded] = React.useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const isInitialMount  = useRef(true);
    const [likeCount,setLikeCount] = useState(likes.length)
    const [isLiked , setIsLiked] = useState(false);
    const [likeId, setLikeId] = useState(null);
    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
    };
    const handleLike = () => {
        setIsLiked(!isLiked);

        if(!isLiked){
            saveLike()
            setLikeCount(likeCount + 1 );
        } else {
            deleteLike();
            setLikeCount(likeCount - 1);
        }
    }
    const refreshComments = () => {
        fetch(`/comments?postId=${postId}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCommentList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    const saveLike = () => {
        fetch("/likes", {
            method :"POST",
            headers :{
                "Content-Type" :"application/json",
            },
            body:JSON.stringify({
                postId:postId,
                userId : userId,
            }),
        })
        .then((response)=> response.json())
        .catch((error) => console.log(error))
    }

    const deleteLike = () => {
        fetch("/likes/"+likeId, {
            method:"DELETE",
        })
        .then((res) => res.json()  )
        .catch((err) => console.log(err))
    }



    const checkLikes= () => {
        var likeControl = likes.find( (like => like.userId === userId ));
        if(likeControl != null){
            setLikeId(likeControl.id);
            setIsLiked(true);
        }
        // console.log(likes.map(value => {
        //     if(value.userId === userId){
        //         console.log("value UserId",likes);
        //         console.log("postId",value.postId,"value.userId : ",value.userId, "userId" , {userId})
        //         setIsLiked(true);
        //     }
        // }));
        
    }
useEffect( () => {
    if(isInitialMount.current) {
        isInitialMount.current = false;
    }else {
        refreshComments()
    }
},[commentList])

useEffect(()=> {checkLikes()},[])
    return (
        <div className="post-container">

            <Card className="card" sx={{ width: 800 }}>
                <CardHeader className="card-header"
                    avatar={
                        <Link className='links' to={{ pathname: "/users/" + userId }}  >User
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={title}
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        onClick={handleLike}
                        aria-label="add to favorites">
                        <FavoriteIcon style={isLiked ? { color: "red" } : null} />
                    </IconButton>
                    {likeCount}

                    <ExpandMore
                    
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <InsertCommentIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed className="comment-section">
                        {
                            error ? "error" : 
                            isLoaded ? commentList.map(comment => (
                                <Comment
                                userId={1} 
                                userName={"USER"}
                                text = {comment.text}>
                                </Comment>
                            )) : "Loading"}
                            <CommentForm 
                                userId={1} 
                                userName={"USER"}
                                postId={postId}
                            >
                            </CommentForm>
                    </Container>
                </Collapse>
            </Card>
        </div>
    )
}
export default Post
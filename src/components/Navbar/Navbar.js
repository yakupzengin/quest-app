import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "./Navbar.css"
const Navbar = () => {
    let userId = 1;
    return (
    <div>
         <AppBar position="static">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link className='links' to="/" >Home </Link>
          </Typography>
          <Button color="inherit">Login</Button>
          <Link  className='links' to={{pathname : "/users/" + userId}}  >User</Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
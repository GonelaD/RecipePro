
import { Box, Toolbar,Button, AppBar , Container, Typography} from "@mui/material";
import './MainLayout.css';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import Keyword from "./Keyword";
import React,{Fragment} from "react";
import AdbIcon from '@mui/icons-material/Adb';
import logo from "../images/logo213.png";


const MainLayout = () => {
  

  const myStyle ={
    backgroundImage:"url(https://t4.ftcdn.net/jpg/05/01/31/17/360_F_501311720_FRpAbXeDa0MDrExlyLRS6cMkgYYRqJsf.jpg",
    height:'100vh',
        // marginTop:'-70px',
      
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
  }
  return (
   
    <Fragment>
      <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box
        component="img"
        sx={{
          height: 80,
          width: 200,
          backgroundSize:"contain",
          backgroundColor:"inherit"
        
        }}
        alt="logo"
        src={logo}
      />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize:"25px",
              marginLeft:"-3%",
              marginTop:"0.7%"
            }}
          >
            Grocery Pro
          </Typography>

         
          
        </Toolbar>
      </Container>
      </AppBar>
      <div style={{background:"white",height:"100vh"}}>
      <Keyword />
    </div>
    </Fragment>
    
   
  );
};

export default MainLayout;

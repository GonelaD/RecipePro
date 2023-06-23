
import { Box, Toolbar,Button } from "@mui/material";
import './MainLayout.css';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import Keyword from "./Keyword";
import React,{Fragment} from "react";


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
      
      <div style={{background:"white",height:"100vh"}}>
      <Keyword />
    </div>
    </Fragment>
    
   
  );
};

export default MainLayout;

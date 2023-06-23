import logo from './logo.svg';
import './App.css';
import background from './images/mainpage.jpeg'
import { Fragment, useState } from 'react';
import MainLayout from './components/MainLayout';
import { Typography } from '@mui/material';

function App() {
  const [showMainPage,setShowMainPage] = useState(true);
  const myStyle ={
    backgroundImage:"url(https://t4.ftcdn.net/jpg/05/01/31/17/360_F_501311720_FRpAbXeDa0MDrExlyLRS6cMkgYYRqJsf.jpg",
    height:'100vh',
        // marginTop:'-70px',
      
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
  }
  return (
    <Fragment>
      {showMainPage && <div style={myStyle}>
     <div style={{alignContent:"center",marginTop:"19%",position:"absolute",marginLeft:"10%",width:"40%"}}>
      <Typography>
        <h1 style={{textAlign:"center",color:"white",fontStyle:"italic",fontSize:"40px"}}>Grocery Pro</h1>
        
          <p style={{color:"white",marginTop:"-4%",marginLeft:"2%"}}>What to buy? Search Recipes and plan your groceries accordingly. Use this as recipe finder or grocery planner.
          With an extensive collection of recipes spanning various cuisines, our app is tailored to cater to your dietary preferences, allergies, and health goals. Say goodbye to the hassle of planning meals and grocery shopping blindly! </p>
        
      </Typography>
        
        
       
        <button className='getStarted' onClick={()=>setShowMainPage(false)}>Get Started</button>
     </div>
    </div>}
    {!showMainPage && <MainLayout/>}
    
    </Fragment>
    
  );
}

export default App;

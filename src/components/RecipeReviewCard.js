import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TextField, Button, Link, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Checkbox, imageListClasses } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function RecipeReviewCard(props) {

  const [open,setOpen] = React.useState(false);

  const handleClick = ()=>{
    setOpen(true);
  }

  const handleClose = () =>{
    setOpen(false);
  }
  
  React.useEffect(()=>{
    console.log(props)
  },[props])

  let health_list = props.recipe.healthLabels;
  let input_text = "";
  for(var i=0;i<health_list.length;i++){
    input_text += health_list[i];
    if(i!=health_list.length-1){
      input_text += ' , ';
    }
  }

  return (
    <React.Fragment>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          
            <div>
            <Button variant="text" >
              <IconButton aria-label="settings">
              <InfoOutlinedIcon sx={{ fontSize: 30 }} onClick={handleClick} />
              </IconButton>
            </Button>
            <Dialog
            open={open}
            onClose={handleClose}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">{props.recipe.label}</DialogTitle>
            <DialogContent dividers={true}>
              <DialogContentText
                id="scroll-dialog-description"
                // ref={descriptionElementRef}
                tabIndex={-1}
              >
                {/* {[...new Array(50)]
                  .map(
                    () => `Cras mattis consectetur purus sit amet fermentum.
    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                  )
                  .join('\n')} */}
                  <div style={{display:"flex",flexDirection:"column",flexWrap:"wrap"}}>
                  {props.recipe.ingredientLines.map((ele,index)=>{ 
                    if(ele!="undefined"){
                      console.log("here",ele);return <p style={{marginTop:"-1%"}}>{ele}</p>}
                    })
                   
                  }
                  </div>
                  <h2>Recipe</h2>
                  <Typography>
                  <Link onClick={()=>window.open(props.recipe.url,'_blank')} >
                    {props.recipe.url}
                  </Link>
                  </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {/* <Button onClick={handleClose}>Subscribe</Button> */}
            </DialogActions>
          </Dialog>
      </div>
         
        }
        title={props.recipe.label}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.recipe.image}
        alt="Paella dish"
      />
      <CardContent>
        <p>{props.recipe.yield} Servings</p>
        <h2>{(props.recipe.calories/props.recipe.yield).toFixed(2)} kcal</h2>
        <div style={{display:"flex",flexDirection:"row"}}>
        <Typography variant="body2" color="text.secondary">
          {input_text}
         
        </Typography>

        </div>
       
      </CardContent>
      
    </Card>
    </React.Fragment>
  );
}
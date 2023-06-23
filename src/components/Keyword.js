import React, { Fragment, useEffect, useState } from "react";
import { TextField, Button, Pagination, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Checkbox, imageListClasses, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import axios from "axios";
import RecipeReviewCard from "./RecipeReviewCard";
import "./MainLayout.css"
import { PartyModeSharp } from "@mui/icons-material";


let selectedAllergy = []
let selectedDiet = []
let selectedCalories = null
let selectedNutrients = []
let selectedList = []

let minValue = 0
let maxValue = 0

let allergies_list = ['Celery-free','Crustacean-free','Diary-free','Egg-free','Fish-free','Gluten-free','Lupine-free','Mustard-free','Peanut-free','Sesame-free','Shellfish-free','Soy-free','Tree-Nut-free','Wheat-free']

let diet_list = ["Alcohol-free","Balanced","High-Fiber","High-Protein","Keto","Kidney friendly","Kosher","Low-Carb","Low-Fat","Low potassium","Low-Sodium","No oil added","No-sugar","Paleo","Pork-free","Red meat-free","Vegan","Vegetarian"]

let nutrients_list = ["Fat","Saturated","Trans","Cholesterol","Sodium","Calcium","Magnesium","Potassium","Iron","Phosphorus","Vitamin A","Vitamin C","Thiamin(B1)","Riboflavin(B2)","Niacin(B3)","Vitamin B6","Folate","Vitamin B12","Vitamin D","Vitamin E","Vitamin K"]

let final_list = [...allergies_list,...diet_list,...nutrients_list]


const Keyword = () => {
    let final_obj = {};
    if(final_list && final_list.length>0){
        for(let i=0;i<final_list.length;i++){
           final_obj[final_list[i]] = false;
           final_obj[final_list[i]+"dialog"] = false;
        }
    }
    // console.log("final",final_obj)

    const [recipe,setRecipe] = useState();
    const [data,setData] = useState([]);
    const [pg,setPg] = useState(0);
    const [showData,setShowData] = useState([]);
    const [allergy,setAllergy] = useState([]);
    const [diet,setDiet] = useState([]);
    const [calories,setCalories] = useState();
    const [nutrients,setNutrients] = useState([]);
    const [min,setMin] = useState();
    const [max,setMax] = useState();

    const [allergyOpen,setAllergyOpen] = useState(false);
    const [dietOpen,setDietOpen] = useState(false);
    const [caloriesOpen,setCaloriesOpen] = useState(false);
    const [nutrientsOpen,setNutrientsOpen] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [loading,setLoading] = useState(true);
    
    const [selectedItems,setSelectedItems] = useState([]);

    const [state, setState] = useState(final_obj);

    const [error,setError] = useState(false);
    const [noRecipe,setNoRecipe] = useState(false);

    const handleList = (event,item) => {
        if(item){
            setState({
                ...state,
                [event.target.name+"dialog"]: event.target.checked,
                [event.target.name]: event.target.checked,
              });
            //   console.log("element",event,selectedItems)
              let ele = event.target.name;
              let index = -1;
              for(var i=0;i<selectedItems.length;i++){
                if(selectedItems[i].name == ele){
                    index = i;
                    break;
                }
              }
            //   console.log("index",index)
              if(index!=-1){
                let tmpArr = selectedItems.splice(index+1,1);
                  selectedList = selectedItems;
                //   console.log("why",tmpArr);
                  setSelectedItems(tmpArr);
                  return 

              }
             
                //   console.log("else")
                //   let tmpArr = selectedItems;
                //   tmpArr.push({
                //     name:
                //   });
                //   selectedList = tmpArr;
                //   setSelectedItems(tmpArr);

        }
        else{
            setState({
                ...state,
                [event.target.name]: event.target.checked,
              });
            //   console.log("element",event,selectedItems)
              let ele = event.target.name;
              if(selectedItems.includes(ele)){
                  let indexOfEle = selectedItems.indexOf(ele);
                //   console.log("index",indexOfEle)
                  let tmpArr = selectedItems.splice(indexOfEle,1);
                  selectedList = tmpArr;
                  setSelectedItems(tmpArr);
                  return 
              }
                //   console.log("else")
                  let tmpArr = selectedItems;
                  tmpArr.push(ele);
                  selectedList = tmpArr;
                  setSelectedItems(tmpArr);

        }
        
       
       
        
    }

    const handleInsideNutrientsList = (event,min,max,dialog) =>{
       
        setState({
            ...state,
            [event.target.name]:event.target.checked,
            [event.target.name+"dialog"]: false,
          });
        // console.log("element",event,selectedItems)
        let ele = event.target.name;
        let index = -1;
        for(var i=0;i<selectedItems.length;i++){
            if(selectedItems[i].name == ele){
                index = i;
                break;
            }
        }

        if(index!=-1){
            let tmpArr = selectedItems.splice(index,1);
            if(event.target.checked){
                tmpArr.push({
                    name:ele,
                    min:min,
                    max:max
                })

            }
            
            selectedList = tmpArr;
            setSelectedItems(tmpArr);
            return 

        }
       
        // console.log("else")
        let tmpArr = selectedItems;
        tmpArr.push({
            name:ele,
            min:min,
            max:max
        });
        selectedList = tmpArr;
        setSelectedItems(tmpArr);

    }

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    useEffect(()=>{

        axios.get('https://api.edamam.com/search', 
            { params: 
                { app_id : "900da95e",
                app_key:"40698503668e0bb3897581f4766d77f9",
                q:`${recipe}`
                } 
            }
        ).then((res)=>{
            // console.log("result",res.data)
            setData(res.data.hits);
            setLoading(false);
            getPaginatedData(res.data.hits,0);
        }).catch((res)=>{
            console.log("error",res);
            setError(true);
        })

    },[])

    const getPaginatedData = (tmpData,page) =>{
        let reqData = tmpData.slice(page*3,page*3+3);
        // console.log("page data",reqData);
        setShowData(reqData);
        setPg(page+1);
    }

    const getNewRecipes = () => {
    
        setLoading(true);
        console.log("recipe",recipe)
        var params = new URLSearchParams();
        params.append("app_id", "900da95e");
        params.append("app_key", "40698503668e0bb3897581f4766d77f9");
        if(!recipe){
            setNoRecipe(true);
        }
        params.append("q", recipe);
       
       
        if(selectedAllergy.length>0){
            let tmpArr = selectedAllergy;
            tmpArr = tmpArr.forEach((ele)=> params.append("healt",ele.toLowerCase()))
    
        }
        if(selectedDiet.length>0){
            let tmpArr = selectedDiet;
            tmpArr = tmpArr.forEach((ele)=> params.append("healt",ele.toLowerCase()))
        }
        if(calories){
            params.append("calories",calories)
        }

        if(selectedNutrients && selectedNutrients.length>0){
            let tmpArr = selectedNutrients;
            let arr = []
            tmpArr.forEach((ele)=>{
                let obj = {}
                obj[ele['name']] = ele['min']+"-"+ele['max'];
                params.append("nutrients["+ele['name'].toUpperCase()+"]",ele['min']+"-"+ele['max'])
                arr.push(obj);
            })
            
        }

        // console.log("params",params)

        
       
        axios.get('https://api.edamam.com/search', 
            { params: params
            }
        ).then((res)=>{
            // console.log("new result",res.data)
            setTimeout(() => {
                setData(res.data.hits);
                getPaginatedData(res.data.hits,0);
                setLoading(false);
              }, 5000);
            
            
        }).catch((res)=>{
            setError(true);
        })
    }

    const handleAllergyClose = ()=>{
        setAllergyOpen(false);
        setAllergy([]);
        // setSelectedItems([]);
    }

    const handleAllergyApply = (items) => {
        // console.log("items",items)
        setAllergyOpen(false);
        selectedAllergy = items;
        setAllergy(items);
        setSelectedItems([]);
        getNewRecipes();
    }

    const handleDietClose = ()=>{
        setDietOpen(false);
        setDiet([]);
    }

    const handleDietApply = (items) => {
        // console.log("diet",items);
        setDietOpen(false);
        selectedDiet = items;
        setDiet(items);
        setSelectedItems([]);
        getNewRecipes();
    }

    const handleCaloriesClose = () =>{
        setCaloriesOpen(false);
        
    }

    const handleCaloriesApply = () =>{
        
        setCaloriesOpen(false);
        setSelectedItems([]);
        getNewRecipes();
    }

    const handleNutrientsClose = () =>{
        setNutrientsOpen(false);
        setNutrients([]);
    }

    const handleNutrientsApply = (items) =>{
        console.log("nuts",items);
        selectedNutrients = items;
        setNutrients(items);
        setNutrientsOpen(false);
        // setSelectedItems([]);
        getNewRecipes();
    }

    

    
    return(
        <div>
            {/* {console.log("selected",selectedItems)} */}
            <h2 style={{textAlign:"center",position:"relative",marginTop:"30px"}}>Search For Recipe by Keyword</h2>
            <TextField onChange={(ele)=>setRecipe(ele.target.value)} style={{width:"680px",marginLeft:"30%"}} placeholder="for example : chicken pasta" InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            endAdornment : <InputAdornment position="end"> <Button variant="contained" onClick={()=>getNewRecipes()}>Search</Button></InputAdornment>
          }} />
          <div style={{display:"flex",flexDirection:"row",marginLeft:"35%",marginTop:"1%"}}>
            <div style={{position:"relative",marginLeft:"2%"}}>
                <Button variant="contained" onClick={()=>setAllergyOpen(true)}>Allergies</Button>
                <Dialog onClose={handleAllergyClose}
             open={allergyOpen} >
                <DialogTitle>Allergies</DialogTitle>
                <DialogContent>
                    <div style={{display:"flex",flexWrap:"wrap"}}>
                    {allergies_list.map((item)=>{
                        // {console.log("here",selectedList)}
                        
                        return(
                            <div style={{marginLeft:"2%",marginTop:"1%"}}>
                                <Checkbox name={item} onChange={(event)=>handleList(event)} checked={state[item]} />
                                {item}    
                            </div>    
                        )
                    })}
                    </div>
                    {/* <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" onClick={()=>handleAllergyApply(selectedItems)}>Apply</Button>
                    <Button variant="contained" color="error" onClick={handleAllergyClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            </div>
            <div style={{position:"relative",marginLeft:"2%"}}>
                <Button variant="contained" onClick={()=>setDietOpen(true)}>Diets</Button>
                <Dialog onClose={handleDietClose}
             open={dietOpen} >
                <DialogTitle>Diets</DialogTitle>
                <DialogContent>
                    <div style={{display:"flex",flexWrap:"wrap"}}>
                    {diet_list.map((item)=>{
                        return(
                            <div style={{marginLeft:"2%",marginTop:"1%"}}>
                                <Checkbox name={item} onChange={(event)=>handleList(event)} checked={state[item]}/>
                                {item}    
                            </div>    
                        )
                    })}
                    </div>
                    
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" onClick={()=>handleDietApply(selectedItems)}>Apply</Button>
                    <Button variant="contained" color="error" onClick={handleDietClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            </div>
            <div style={{position:"relative",marginLeft:"2%"}}>
                <Button variant="contained" onClick={()=>setCaloriesOpen(true)} >Calories</Button>
                <Dialog onClose={handleCaloriesClose}
             open={caloriesOpen} >
                <DialogTitle>Calories</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div>
                            Input maximum desired calories per serving.
                            <br/>
                            Default Serving is 100g

                        </div>
                        <br/>
                        
                        <div>
                        <TextField id="outlined-basic" label="Calories-per-serving" variant="outlined" onChange={(ele)=>setCalories(ele.target.value)} 
                        value={calories}
                        InputProps={{
            endAdornment : <InputAdornment position="end"> kcal</InputAdornment>
          }}  />
                        </div>
                        
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" onClick={()=>handleCaloriesApply()}>Apply</Button>
                    <Button variant="contained" color="error" onClick={handleCaloriesClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            </div>
            <div style={{position:"relative",marginLeft:"2%"}}>
                <Button variant="contained" onClick={()=>setNutrientsOpen(true)}>Nutrients</Button>
                <Dialog onClose={handleNutrientsClose}
                open={nutrientsOpen} >
                    <DialogTitle>Nutrients</DialogTitle>
                    <DialogContent>
                        <div style={{display:"flex",flexWrap:"wrap"}}>
                        {nutrients_list.map((item)=>{
                            return(
                                <div style={{marginLeft:"2%",marginTop:"1%"}}>

                                    <Checkbox name={item} onChange={(ele)=>handleList(ele,"nuts")} checked={state[item]}/>
                                    {item}
                                    <Dialog open={state[item+"dialog"]}>
                                        <DialogTitle>{item}</DialogTitle>
                                        <DialogContent>
                                            <Typography>
                                            Choose minimum and maximum values for a desired nutrient per serving. For individual foods, the default serving size is 100 g
                                            <br />
                                            <br />
                                            <div>
                                                <TextField id="outlined-basic" label="Min" variant="outlined" type="number" error={!min} onChange={(ele)=>{
                                                    minValue = ele.target.value;
                                                    setMin(minValue);
                                                }} />
                                            </div>
                                            <br />
                                            <div>
                                                <TextField id="outlined-basic" label="Max" variant="outlined" type="number" error={!max} onChange={(ele)=>{
                                                    maxValue = ele.target.value;
                                                    setMax(maxValue);
                                                }} />
                                            </div>
                                            
                                            
                                            </Typography>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button variant="contained" color="success" onClick={()=>{
                                                let event = {}
                                                event.target = {}
                                                event.target.name = item;
                                                event.target.checked = true;
                                                handleInsideNutrientsList(event,minValue,maxValue);

                                            }}>Apply</Button>
                                            <Button variant="contained" color="error" onClick={()=>{
                                                let event = {}
                                                event.target = {}
                                                event.target.name = item;
                                                event.target.checked = false;
                                                handleInsideNutrientsList(event,minValue,maxValue);
                                            }}>Cancel</Button>

                                        </DialogActions>
                                    </Dialog>
                                </div>    
                            )
                        })}
                        </div>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="success" onClick={()=>handleNutrientsApply(selectedItems)}>Apply</Button>
                        <Button variant="contained" color="error" onClick={handleNutrientsClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
          </div>
        
          {loading? <div className="progress-bar"><CircularProgress /></div> :
          <Fragment>
          <div style={{display:"flex",flexWrap:"wrap",flexDirection: windowWidth <= 1200 ? 'column' : 'row',width:"100em",marginTop:"3%",backgroundColor:"white"}}>
            {showData &&  showData.length>0 && showData.map((ele)=>{
                return (
                    <div style={{marginLeft:"10%",position:"relative",display:"flex"}}>
                        <RecipeReviewCard recipe={ele.recipe}/>
                    </div>
                )
            })}
          </div>
        { showData && showData.length>0 && <div style={{position:"relative",marginLeft:"44%",marginTop:"0.5%"}}>
        <Pagination count={3} onChange={(ele,value)=>
            getPaginatedData(data,value-1)
        } />
        </div>}

        {error && <Dialog open={error}>
            <DialogTitle>Uh-Oh</DialogTitle>
            <DialogContent>
                <Typography>
                    Seems like we couldn't find a recipe with given requirements. Modify them a little to get amazing recipes.
                </Typography>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" color="error" onClick={()=>setError(false)}>Gotcha</Button>
            </DialogActions>
            </Dialog>}

            {noRecipe && <Dialog open={noRecipe}>
            <DialogTitle>Umm...?</DialogTitle>
            <DialogContent>
                <Typography>
                    Seems like you didn't enter any dish. We will show random food options. 
                    <br/>
                    If you want to change this, give in a dish,
                    else enjoy these random dishes.
                </Typography>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" onClick={()=>setNoRecipe(false)}>Gotcha</Button>
            </DialogActions>
            </Dialog>}
        </Fragment>}

        
         
            
           {/* {recipe && data.length==0 && <p>Loading</p>}
          {recipe && data.length>0 && <RecipeReviewCard />} */}
        </div>
    )
}

export default Keyword;
import { Box, Card, Typography } from "@mui/material"
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import todoImage from "../Images/todo image.jpg"
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { signUpUser } from "../config/firebaseMethod";
import { useState } from "react";



function SignUp () {

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const signUp = () => {

        signUpUser({firstname, lastname, email, password}).then((userCredential) => {
            // Signed in 
            const user = userCredential;
            console.log(user)
            // ...
          })
          .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage,'message');
            // console.log(errorCode);

            // ..
          });
        
    }
    return (
        
            <Grid container sx={{display : "flex", justifyContent : "center"}}>
        
                     
                <Box sx={{display : "flex", width : "90%", marginTop : 6}}>
                
                <Grid item md={7} sx={{display : {sm : 'none', xs : 'none', md : 'flex'}}}>
                    <Box>
                         <img src={todoImage} width="100%" height="100%" alt="zxczx" />
                    </Box>
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                    {/* <Box className="container-Login"> */}
                        {/* <Box className="inner-container-Login"> */}
                        
                        <Card  sx={{textAlign : "center",display:"flex",justifyContent:"center",flexDirection:"column"}}>

                        <Typography variant="p" component="div" sx={{fontSize : "1.5rem", fontWeight : "bold"}}>
                            Sign In
                        </Typography>
                       <Box>
                        <TextField type="text" onChange={(e) => setFirstname(e.target.value)} sx={{marginTop : 2, width:"90%",fontSize:"16px"}} id="filled-basic" label="First Name" variant="standard" />
                        </Box>
                        <Box>
                        <TextField type="text" onChange={(e) => setLastname(e.target.value)} sx={{width:"90%",fontSize:"16px",marginTop:"20px"}} id="filled-basic" label="Last Name" variant="standard" />
                        </Box>
                        <Box>
                        <TextField type="email" onChange={(e) => setEmail(e.target.value)} sx={{width:"90%",fontSize:"16px",marginTop:"20px"}} id="filled-basic" label="Email Address" variant="standard" />
                        </Box>
                        <Box>
                        <TextField type="password" onChange={(e) => setPassword(e.target.value)} sx={{width:"90%",fontSize:"16px",marginTop:"20px"}} id="filled-basic" label="Password" variant="standard" />
                        </Box> 
                        
                        <Box>
                      <Link style={{textDecoration:"none"}} to=""  onClick={signUp} > <Button sx={{marginTop: 5,width:"90%",borderRadius:"10px"}} variant="contained" color="success"  >Sign In</Button></Link>
                        </Box>

                        <Box sx={{marginBottom : 2}}>
                       <Link style={{textDecoration:"none"}} to = "/" > <Button sx={{marginTop: 2,width:"90%",borderRadius:"10px"}} variant="contained" color="primary"  >Login</Button></Link>
                        </Box>
                        
                        {/* </Box> */}
                    {/* </Box> */}
                        </Card>
                        
                        </Grid>
                        
                </Box>
                
            </Grid>        
        )
}

export default SignUp
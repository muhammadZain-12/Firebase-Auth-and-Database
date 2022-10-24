import { Box, Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import todoImage from "../Images/todo image.jpg";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { logInUser } from "../config/firebaseMethod";
import { useState } from "react";

function LogIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = () => {
  
    logInUser({ email, password }).then((success) => {
        if (success) {
          console.log(success)
          navigate("/todo", { state: success });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ display: "flex", width: "90%", marginTop: 6 }}>
        <Grid
          item
          md={7}
          sx={{ display: { sm: "none", xs: "none", md: "flex" } }}
        >
          <Box>
            <img src={todoImage} width="100%" height="100%" alt="zxczx" />
          </Box>
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          {/* <Box className="container-Login"> */}
          {/* <Box className="inner-container-Login"> */}

          <Card
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="p"
              component="div"
              sx={{ marginTop: 3, fontSize: "1.5rem", fontWeight: "bold" }}
            >
              LogIn
            </Typography>

            <Box>
              <TextField
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: "90%", fontSize: "16px", marginTop: "20px" }}
                id="filled-basic"
                label="Email Address"
                variant="standard"
              />
            </Box>
            <Box>
              <TextField
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                sx={{ width: "90%", fontSize: "16px", marginTop: "20px" }}
                id="filled-basic"
                label="Password"
                variant="standard"
              />
            </Box>
            <Link to="forgetPassword" sx={{ marginTop: 2 }}>
              Forget Password
            </Link>
            <Box>
              <Link style={{ textDecoration: "none" }} to="/">
                {" "}
                <Button
                  onClick={logIn}
                  sx={{ marginTop: 5, width: "90%", borderRadius: "10px" }}
                  variant="contained"
                  color="success"
                >
                  Login
                </Button>{" "}
              </Link>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Link style={{ textDecoration: "none" }} to="SignUp">
                {" "}
                <Button
                  sx={{ marginTop: 2, width: "90%", borderRadius: "10px" }}
                  variant="contained"
                  color="primary"
                >
                  SignUp
                </Button>{" "}
              </Link>
            </Box>

            {/* </Box> */}
            {/* </Box> */}
          </Card>
        </Grid>
      </Box>
    </Grid>
  );
}

export default LogIn;

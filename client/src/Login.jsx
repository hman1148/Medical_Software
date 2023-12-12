import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button"
import { CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import makeRequest from "./Utils/make_request";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import "../public/login_signup.css"

const defaultTheme = createTheme();

let Login = () => {

      const [loginData, setLoginData] = useState({
        email:'',
        password: ''
      });

      const [error, setError] = useState(false);

      const loginHandler = (event) => {
        const {name, value} = event.target;
        setLoginData({...loginData, [name]: value})
      }


      const loginUser = async () => {
        
        if (!loginData.email || !loginData.password) {
          setError(true);
        } else {
          const result = await makeRequest("/login", "post", loginData);
        }

    }

      return (
        <>
        <ThemeProvider theme={defaultTheme}>
          <Container className="form-container" component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              {/* Make Request */}
              <Box component="form" onSubmit={loginUser} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={loginData.email}
                  onChange={loginHandler}
                  autoComplete="email"
                  autoFocus
                /> 
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={loginData.password}
                  onChange={loginHandler}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* Add Links to Signup here */}
                  </Grid>
                  <Grid item>
                    <Link href="/static/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            Copyright © 2023 
          </Container>
        </ThemeProvider>

       {error && (
        <Snackbar
        open={error}
        autoHideDuration={300000}
        onClose={() => setError(false)}
        >
          <Alert onClose={() => setError(false)} severity="error">
            Please fill in all the required data.
          </Alert>
        </Snackbar>
       )}

        </>
      );

}

export default Login;
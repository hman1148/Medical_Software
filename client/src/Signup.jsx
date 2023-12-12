import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button"
import { CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import makeRequest from "./Utils/make_request";
import { useState } from "react";
import "../public/login_signup.css"


const defaultTheme = createTheme();
let Signup = () => {

      const [signupData, setSignUpData] = useState({
        email:'',
        password: ''
      });

      const [error, setErrror] = useState(false);
      
      const signupHandler = (event) => {
        const {name, value} = event.target;
        setSignUpData({...signupData, [name]: value})
      }

      const signupUser = async () => {
        if (!signupData.email || !signupData.password) {
          setErrror(true);
        } else {
          const result = await makeRequest("/create_account", "post", signupData);
          console.log(result);
        }
      }

      return (
        <>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
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
                Sign in
              </Typography>
              
              {/* Make Request */}
              <Box component="form" onSubmit={signupUser} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={signupData.email}
                  onChange={signupHandler}
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
                  value={signupData.password}
                  onChange={signupHandler}
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
                    <Link href="/static" variant="body2">
                      {"Go back to Login"}
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

export default Signup;
import {Box, Toolbar, AppBar, Button, Typography} from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {toast, ToastContainer} from "react-toastify"
import cookie from "cookie";


let Nav = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch('/user', {
                    credentials: 'include'
                });

                if (!response.ok) {
                    toast.error("Couldn't get user");
                }

                const data = await response.json();

                if (data.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
}, []);


    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await fetch(`/logout`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-CSRFToken": cookie.parse(document.cookie).csrftoken
                },
                credentials: 'include'
            });

            if (!response.ok) {
                toast.error("Couldn't log out");
            }

            const data = await response.json();

            if (data.success == true) {
                toast.success("Successfully logged out!");
                setTimeout(() => window.location.href = "/" , 2000);
            } else {
                toast.success("Couldn't logout")
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
    <>
    <ToastContainer position="top-right" autoClose={2000} style={""}/>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{borderRadius: '15px'}}>
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user ? user.first_name : ""}
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </>
    )

}
export default Nav; 
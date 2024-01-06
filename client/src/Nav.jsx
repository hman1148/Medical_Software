import {
    Box, 
    Toolbar, 
    AppBar, 
    Button, 
    Typography, 
    IconButton, 
    Drawer, 
    Divider, 
    List, 
    ListItem, 
    ListItemButton,
    ListItemIcon, 
    ListItemText,
 } 
    from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import { useEffect, useState } from "react";
import {Link as RouterLink} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"
import cookie from "cookie";
import "react-toastify/dist/ReactToastify.css";

const drawerWidth = 240;

let Nav = () => {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);

    const fileInputReference = useRef(null);
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      }));

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
                toast.error("Couldn't logout");
            }

        } catch (error) {
            console.log(error);
        }
    }

    const importPatients = async (event) => {

        const file = event.target.files[0];
        
       if (file) {
          let allowedTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // for .xlsx files
            'application/vnd.ms-excel' 
        ];

        if (allowedTypes.includes(file.type)) {
          const formData = new FormData();
          formData.append('excel_file', file);

        try {
          const response = await fetch(`/import_patient`, {
            method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-CSRFToken": cookie.parse(document.cookie).csrftoken
                },
                body: JSON.stringify(formData),
                credentials: 'include'
          });
          const data = await response.json();

          if (data.message == "success") {
              toast.success("Successfully imported CSV file!");
          } else {
            toast.error("Couldn't import CSV file, please validate the data first.")
          } 
        } catch (error) {
          toast.error(`Server responsed with the following error: ${error.message}`);
        }
    }
  }


    return (
    <>
    <ToastContainer position="top-right" autoClose={2000} style={""}/>
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ borderRadius: '15px' }}>
            <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
            <div style={{ flexGrow: 1 }}></div>
            <Typography variant="h6" component="div" style={{marginRight: '20px'}}>
                {user ? user.first_name : ""}
            </Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
            </Toolbar>
        </AppBar>
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>  
            <ListItem key={"Home"} disablePadding>
              <ListItemButton component={RouterLink} to="/">
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Add Patient"} disablePadding>
              <ListItemButton component={RouterLink} to="/central/create_patient_page">
                <ListItemIcon>
                    <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary={"Add Patient"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Logs Page"} disablePadding>
              <ListItemButton component={RouterLink} to="/central/logs">
                <ListItemIcon>
                    <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary={"Logs Page"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Import Patients"} disablePadding>
              <ListItemButton onClick={importPatients}>
                <ListItemIcon>
                    <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary={"Import Patients"} />
              </ListItemButton>
            </ListItem>
           
        </List>
        <Divider />
    </Drawer>
    </Box>
    </>
    )
      }
}
export default Nav; 
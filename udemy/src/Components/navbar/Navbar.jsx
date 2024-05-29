import React, { useState } from "react";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Swal from 'sweetalert2';
import {TextField} from "@mui/material";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent ,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Add this import statement
import { useCart } from "react-use-cart";
import { Badge } from "@mui/material";
import { Link, NavLink, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ContactPageIcon from "@mui/icons-material/ContactPage";


const pages = [
  { id: 1, name: "Home", link: "/", icon: <HomeIcon /> },
  { id: 2, name: "login", link: "/login", icon: <LoginIcon /> },
  { id: 3, name: "register", link: "/register", icon: <HowToRegIcon /> },
  { id: 4, name: "Contact Us", link: "/contact", icon: <ContactPageIcon /> },
];
const settings = ["Profile", "Account", "Logout"];

function Navbar() {
  const [show, setshow] = useState(false);
  const isLoggedIn = localStorage.getItem("isloggedin") === "true";
  const[opendialog,setopendialog]=useState(false);
  
const navigate=useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setopen] = useState(false);
  const[password,setpassword]=useState('');

  const { totalUniqueItems } = useCart(); // Accessing cart state

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handlesearch = () => {
    setshow(!show);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handledialog = () => {
      setopen(true);
    
  };
  const handleClose = () => {
    setopen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleopen=()=>{


localStorage.removeItem('isloggedin');
handleCloseUserMenu();
setopen(false);
  }
  const handleAdmin=()=>{
setopendialog(true);

  }

  const handleclosedialogadmin=()=>{
setopendialog(false);
  }



  const handlePasswordChange=(e)=>{
setpassword(e.target.value);
  }

  const adminroute=()=>{
setopendialog(false);
if(password==='admin666')
  {
navigate('/sidebar');

  }
  else
  {
    
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Incorrect password. Please try again"
    });
  }


  }


  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <Link to="/">
                {" "}
                <img
                  src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg"
                  alt="Logo"
                  style={{ width: "100px", height: "35px" }}
                />
              </Link>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <img
                  src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg"
                  alt="Logo"
                  style={{ width: "100px", height: "35px" }}
                />
              </div>
              {/* hamburger menu (mobile view)*/}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <NavLink to={page.link}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <ul className="list">
                <li>
                  <NavLink to="/" activeclassname="active" className="navlink">
                    <HomeIcon />
                    <h1>Home</h1>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/contact"
                    activeclassname="active"
                    className="navlink"
                  >
                    <ContactPageIcon /> <h1>Contact</h1>
                  </NavLink>
                </li>
                {!isLoggedIn && (
                  <li>
                    <NavLink
                      to="/login"
                      activeclassname="active"
                      className="navlink"
                    >
                      <LoginIcon /> <h1>Login</h1>
                    </NavLink>
                  </li>
                )}
                {!isLoggedIn && (
                  <li>
                    <NavLink
                      to="/register"
                      activeclassname="active"
                      className="navlink"
                    >
                      <HowToRegIcon /> <h1> Register</h1>
                    </NavLink>
                  </li>
                )}
              </ul>
            </Box>

            <Box
              sx={{ flexGrow: 0 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                gap: "10px",
              }}
            >
              <div className="search-container">
                <input
                  type="search"
                  className="search"
                  placeholder="Search for Products"
                ></input>
              
                <IconButton onClick={handlesearch}>
                  <SearchOutlinedIcon />
                </IconButton>
                
              </div>

              <div>
              {
                isLoggedIn && (
              
              <Tooltip title='Admin'> 
              <IconButton onClick={handleAdmin}>
              <AdminPanelSettingsIcon/>
              </IconButton> </Tooltip>
            )}
                <Tooltip title="Wishlist">
                  <IconButton>
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>
                
                
                <Tooltip title="Shopping Cart">
                  <IconButton>
                    <Link to="/cart">
                      <Badge badgeContent={totalUniqueItems} color="primary">
                        <ShoppingCartOutlinedIcon />
                      </Badge>
                    </Link>
                  </IconButton>
                </Tooltip>
              {isLoggedIn &&  (<Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>)}
              </div>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
               {settings.map((settings,index)=>
               settings==='Logout'?(<MenuItem key={index} onClick={handledialog}>
<Typography>
{settings}

</Typography>
             </MenuItem>):(<MenuItem key={index} onClick={handleCloseUserMenu}>
              <Typography>{settings}</Typography>
             </MenuItem>)
               )}

              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you want to logout?"}</DialogTitle>
        <DialogActions>
          <Button variant="outlined"   onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleopen}>Logout</Button>
        </DialogActions>
      </Dialog>

{/*below code is contains logic to enter password */}
      <Dialog open={opendialog} fullWidth onClose={handleclosedialogadmin}>
        <DialogTitle>Enter Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="password"
            fullWidth
            variant="standard"
            
            onChange={handlePasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setopendialog(false)} variant='outlined'>Cancel</Button>
          <Button onClick={adminroute} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>


    </>
  );
}
export default Navbar;
// {pages.map((item) => {
//   return (
//     <div key={item.id}>
//       <NavLink
//         to={item.link}
//         activeclassname="active"
//         className="navlink"
//       >
//         {" "}
//         <h1>
//           {item.icon}
//           {item.name}
//         </h1>{" "}
//       </NavLink>
//     </div>
//   );
// })}

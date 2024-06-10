import React, { useState } from "react";
import "./login.css";
import { Button, Snackbar, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Logincomp = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [green, setgreen] = useState(false);
  const [message, setmessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.url}/login`,
        formdata
      ); // Token received from server
      const token = response.data.token; // Access the token from the response
      console.log("Received Token:", token); // Add this line for debugging
      setmessage(response.data.message);
      // Consider using HTTP-only cookies for secure storage
      localStorage.setItem("token", token);
      localStorage.setItem("isloggedin", true);
      setgreen(true);
      if (token) {
        setSnackbarMessage("Login successful");
        setOpenSnackbar(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 1500); // Navigate to another page after 3 seconds
      }
    } catch (err) {
      console.error(err.response.data.error);
      setSnackbarMessage(err.response.data.error);
      setOpenSnackbar(true);
    }
  };

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className="login">
        <div className="image">
          <img src="/IMAGES/loginimages.jpg" alt="login" />
        </div>
        <div className="login-div">
          <div className="loginForm">
            <form method="post" onSubmit={handleSubmit}>
              <h1>Login</h1>
              <p>Please login below</p>
              <p className={green ? "p-login" : ""}>{message}</p>
              <TextField
                type="email"
                fullWidth
                name="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter email"
                variant="standard"
                margin="dense"
                value={formdata.email}
                onChange={handleChange}
              />
              <br />
              <TextField
                className="textfield"
                name="password"
                type="password"
                value={formdata.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                placeholder="Enter password"
                variant="standard"
                margin="dense"
                onChange={handleChange}
              />
              <div className="button">
                <Button variant="contained" type="submit" className="Button">
                  LOG IN
                </Button>
              </div>
              <a href="#">Forgot your password?</a>
            </form>
            <h3>Don't have an account?</h3>
            <br />
            <NavLink to="/register">
              <Button variant="contained" className="button" color="secondary">
                SIGN UP
              </Button>
            </NavLink>
            <br />
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        message={snackbarMessage}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default Logincomp;

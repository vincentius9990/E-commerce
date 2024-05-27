import React, { useState } from "react";
import "./register.css";
import { Button, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Registercomp = () => {
const[formdata,setformdata]=useState({
  fname:'',
  lastname:'',
  email:'',
  password:''
})
const navigate=useNavigate();

 const handlechange=(e)=>{
setformdata({...formdata,[e.target.name]:e.target.value});
 }
 
 const handlesubmit=(e)=>{
  e.preventDefault();
  axios.post("http://127.0.0.1:3000/register",formdata).then((data)=>{
console.log(" form data sent",data);
alert("user created successfully");

navigate('/login');
  }).catch((err)=>{

    console.log("no formdata sent",err);
  })



 }

  return (
    <>
      <div className="login">
        <div className="image"></div>
        <div className="login-div">
          <div className="loginForm">
            <form method="post"  onSubmit={handlesubmit}>
              <h1>Register</h1>
              <p>Please register below</p>

              <TextField
                placeholder="First name"
                fullWidth
                variant="standard"
                margin="dense"
                name="fname"
                onChange={handlechange}
                value={formdata.fname}
              ></TextField>
              <TextField
                placeholder="Last name"
                fullWidth
                variant="standard"
                margin="dense"
                name="lastname"
                onChange={handlechange}
                value={formdata.lastname}
              ></TextField>
              <TextField
                type="email"
                fullWidth
                placeholder="Enter email"
                variant="standard"
                margin="dense"
                name="email"
                onChange={handlechange}
                value={formdata.email}
              ></TextField>
              <TextField
                className=" textfield"
                type="password"
                name="password"
                fullWidth
                placeholder="Enter password"
                variant="standard"
                margin="dense"
                onChange={handlechange}
                value={formdata.password}
              ></TextField>
              <div className="button">
                {" "}
                <Button variant="contained" className="Button" type="submit">
                  SIGN UP
                </Button>{" "}
              </div>
              <a href="#">Forgot your password?</a>
            </form>
            <h3>Already have an account?</h3> <br />
            <NavLink to="/login">
              {" "}
              <Button variant="contained" className="button" color="secondary">
                LOG IN
              </Button>
            </NavLink>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registercomp;

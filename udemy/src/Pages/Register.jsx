import React from 'react'
import { useEffect } from 'react';
import Registercomp from '../Components/Auth/Registercomp';
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate=useNavigate();
  useEffect(()=>{

if(localStorage.getItem("isloggedin")==="true")
  {

navigate('/');

  }


  },[navigate])

   
  return (
    <>
<Registercomp/>

    </>
  )
}

export default Register
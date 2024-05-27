import React, { useEffect } from 'react';
import Logincomp from '../Components/Auth/Logincomp'; // Importing the Login component
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom

const Login = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // useEffect hook to run the code inside it after the component mounts

    if (localStorage.getItem("isloggedin") === "true") {
      // Check if the user is already logged in by looking for 'isloggedin' in localStorage
      navigate('/'); // If the user is logged in, navigate to the home page
    }
  }, [navigate]); // Empty dependency array to run this effect only once after the component mounts

  return (
    <>
      {/* Render the Logincomp component */}
      <Logincomp />
    </>
  );
}

export default Login; // Export the Login component as default

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Forgotcomp from "../Components/Auth/Forgotcomp";

const ForgotPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isloggedin") === "true") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Forgotcomp />
    </>
  );
};

export default ForgotPassword;

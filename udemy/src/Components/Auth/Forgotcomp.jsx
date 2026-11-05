import React, { useState } from "react";
import "./forgot.css";
import {
  Alert,
  Button,
  CircularProgress,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { NavLink } from "react-router-dom";
import API from "../../api/axios";
import { getApiErrorMessage } from "../../utils/apiError";

const Forgotcomp = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const showError = (text) => {
    setError(text);
    setOpenSnackbar(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      showError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      showError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/forgot-password", {
        email: trimmedEmail,
      });

      setMessage(
        response.data.message ||
          "If the account exists, a reset email will be sent.",
      );
      setSubmitted(true);
    } catch (err) {
      showError(
        getApiErrorMessage(
          err,
          "Unable to process your request. Please try again."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className="forgot">
        <div className="forgot-image">
          <img src="/IMAGES/undraw_Login_re_4vu2.png" alt="forgot password" />
        </div>

        <div className="forgot-div">
          <div className="forgotForm">
            {submitted ? (
              <div className="forgot-success">
                <MarkEmailReadIcon className="forgot-success-icon" />
                <h1>Check your email</h1>
                <p>{message}</p>
                <p className="forgot-hint">
                  Didn&apos;t receive anything? Check your spam folder or try
                  again in a few minutes.
                </p>
                <NavLink to="/login" className="forgot-back-link">
                  <Button
                    variant="contained"
                    className="Button"
                    startIcon={<ArrowBackIcon />}
                  >
                    BACK TO LOGIN
                  </Button>
                </NavLink>
              </div>
            ) : (
              <form method="post" onSubmit={handleSubmit}>
                <h1>Forgot password?</h1>
                <p>
                  Enter the email address linked to your account and we&apos;ll
                  send you a link to reset your password.
                </p>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />

                <div className="forgot-button">
                  <Button
                    variant="contained"
                    type="submit"
                    className="Button"
                    disabled={loading}
                    startIcon={
                      loading ? <CircularProgress size={18} color="inherit" /> : null
                    }
                  >
                    {loading ? "SENDING..." : "SEND RESET LINK"}
                  </Button>
                </div>

                <NavLink to="/login" className="forgot-back-link">
                  <ArrowBackIcon fontSize="small" /> Back to login
                </NavLink>
              </form>
            )}
          </div>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Forgotcomp;

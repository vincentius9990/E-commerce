import React, { useState } from "react";
import "./forgot.css";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink, useParams } from "react-router-dom";
import API from "../../api/axios";
import { getApiErrorMessage } from "../../utils/apiError";

const ResetPasswordcomp = () => {
  const { token } = useParams();

  const [formdata, setFormdata] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const showError = (text) => {
    setError(text);
    setOpenSnackbar(true);
  };

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      showError("This reset link is invalid or incomplete.");
      return;
    }

    if (!formdata.password || !formdata.confirmPassword) {
      showError("Please fill in both password fields.");
      return;
    }

    if (formdata.password.length < 8) {
      showError("Password must be at least 8 characters long.");
      return;
    }

    if (formdata.password !== formdata.confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await API.post(`/reset-password/${token}`, {
        password: formdata.password,
      });

      setSubmitted(true);
    } catch (err) {
      showError(
        getApiErrorMessage(
          err,
          "Unable to reset your password. The link may have expired."
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
          <img src="/IMAGES/undraw_Login_re_4vu2.png" alt="reset password" />
        </div>

        <div className="forgot-div">
          <div className="forgotForm">
            {!token ? (
              <div className="forgot-success">
                <h1>Invalid reset link</h1>
                <p>
                  This password reset link is missing its token. Please request
                  a new link.
                </p>
                <NavLink to="/forgot-password" className="forgot-back-link">
                  <Button
                    variant="contained"
                    className="Button"
                    startIcon={<ArrowBackIcon />}
                  >
                    REQUEST A NEW LINK
                  </Button>
                </NavLink>
              </div>
            ) : submitted ? (
              <div className="forgot-success">
                <CheckCircleIcon className="forgot-success-icon" />
                <h1>Password reset</h1>
                <p>
                  Your password has been changed successfully. You can now log
                  in with your new password.
                </p>
                <NavLink to="/login" className="forgot-back-link">
                  <Button variant="contained" className="Button">
                    GO TO LOGIN
                  </Button>
                </NavLink>
              </div>
            ) : (
              <form method="post" onSubmit={handleSubmit}>
                <h1>Reset password</h1>
                <p>Choose a new password for your account.</p>

                <TextField
                  className="reset-field"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  placeholder="New password"
                  variant="standard"
                  margin="dense"
                  value={formdata.password}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  className="reset-field"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  placeholder="Confirm new password"
                  variant="standard"
                  margin="dense"
                  value={formdata.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <p className="reset-hint">
                  Use at least 8 characters. Both passwords must match.
                </p>

                <div className="forgot-button reset-button">
                  <Button
                    variant="contained"
                    type="submit"
                    className="Button"
                    disabled={loading}
                    startIcon={
                      loading ? (
                        <CircularProgress size={18} color="inherit" />
                      ) : null
                    }
                  >
                    {loading ? "RESETTING..." : "RESET PASSWORD"}
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

export default ResetPasswordcomp;

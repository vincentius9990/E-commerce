import React, { useState } from "react";
import "./auth.css";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import WatchIcon from "@mui/icons-material/Watch";
import { NavLink } from "react-router-dom";
import API from "../../api/axios";

const benefits = [
  { icon: <LocalShippingOutlinedIcon />, text: "Fast, tracked delivery on every order" },
  { icon: <ShieldOutlinedIcon />, text: "Secure checkout with buyer protection" },
  { icon: <CheckCircleOutlinedIcon />, text: "7-day no-questions-asked returns" },
];

const Logincomp = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [green, setgreen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/login", formdata);
      const token = response.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("isloggedin", true);
      setgreen(true);
      setSnackbarMessage(response.data.message || "Login successful");
      setOpenSnackbar(true);
      setLoading(false);

      if (token) {
        setTimeout(() => {
          window.location.href = "/";
        }, 1200);
      }
    } catch (err) {
      setLoading(false);
      setgreen(false);
      setSnackbarMessage(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
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
      <main className="auth-page">
        <aside className="auth-brand-panel">
          <NavLink to="/" className="auth-logo">
            <WatchIcon />
            <span>
              Tech<span>Nova</span>
            </span>
          </NavLink>

          <div className="auth-brand-content">
            <h2>Welcome back to TechNova</h2>
            <p>
              Sign in to track orders, save your favourite watches and check out
              faster.
            </p>
            <ul className="auth-benefits">
              {benefits.map((benefit) => (
                <li key={benefit.text}>
                  {benefit.icon}
                  <span>{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <span className="auth-brand-foot">
            © 2026 TechNova. All rights reserved.
          </span>
        </aside>

        <section className="auth-form-panel">
          <div className="auth-card">
            <div className="auth-card-head">
              <h1>Sign in</h1>
              <p>Please log in below to continue.</p>
            </div>

            <form className="auth-form" method="post" onSubmit={handleSubmit}>
              <TextField
                className="auth-field"
                label="Email address"
                type="email"
                fullWidth
                name="email"
                value={formdata.email}
                onChange={handleChange}
                autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                className="auth-field"
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                name="password"
                value={formdata.password}
                onChange={handleChange}
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <div className="auth-row-between">
                <label className="auth-remember">
                  <input type="checkbox" /> Remember me
                </label>
                <NavLink to="/forgot-password" className="auth-link">
                  Forgot password?
                </NavLink>
              </div>

              <Button
                variant="contained"
                type="submit"
                className="auth-submit"
                fullWidth
                disabled={loading}
              >
                {loading ? "Signing in..." : "Log in"}
              </Button>
            </form>

            <div className="auth-divider">
              <span>New to TechNova?</span>
            </div>

            <p className="auth-alt">
              Don&apos;t have an account?{" "}
              <NavLink to="/register">Create one</NavLink>
            </p>

            <p className="auth-terms">
              By signing in you agree to our <a href="/terms">terms</a> and{" "}
              <a href="/terms#privacy">privacy policy</a>.
            </p>
          </div>
        </section>
      </main>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={green ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Logincomp;

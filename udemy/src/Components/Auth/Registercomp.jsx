import React, { useState } from "react";
import "./auth.css";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import WatchIcon from "@mui/icons-material/Watch";
import { NavLink, useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../utils/alerts";
import API from "../../api/axios";
import { getApiErrorMessage } from "../../utils/apiError";

const benefits = [
  { icon: <LocalShippingOutlinedIcon />, text: "Track every order from checkout to door" },
  { icon: <ShieldOutlinedIcon />, text: "Secure checkout with buyer protection" },
  { icon: <CheckCircleOutlinedIcon />, text: "7-day no-questions-asked returns" },
];

const Registercomp = () => {
  const [formdata, setformdata] = useState({
    fname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (
      formdata.fname.trim() === "" ||
      formdata.lastname.trim() === "" ||
      formdata.email.trim() === "" ||
      formdata.password === ""
    ) {
      showError("Blank values not allowed", "Please fill in all the fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formdata.email.trim())) {
      showError("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (formdata.password.length < 6) {
      showError("Weak password", "Use at least 6 characters for your password.");
      return;
    }

    if (formdata.password !== confirmPassword) {
      showError("Passwords do not match", "Please re-enter your password.");
      return;
    }

    setLoading(true);

    API.post("/register", formdata)
      .then(() => {
        setLoading(false);
        showSuccess("Account created", "Welcome to TechNova — you can log in now.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        showError(
          "Could not create account",
          getApiErrorMessage(err, "Please try again in a moment.")
        );
      });
  };

  return (
    <main className="auth-page">
      <aside className="auth-brand-panel">
        <NavLink to="/" className="auth-logo">
          <WatchIcon />
          <span>
            Tech<span>Nova</span>
          </span>
        </NavLink>

        <div className="auth-brand-content">
          <h2>Join the TechNova community</h2>
          <p>
            Create an account for faster checkout, order tracking and early
            access to new drops.
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
            <h1>Create your account</h1>
            <p>It only takes a minute to get started.</p>
          </div>

          <form className="auth-form" method="post" onSubmit={handlesubmit}>
            <div className="auth-names">
              <TextField
                className="auth-field"
                label="First name"
                fullWidth
                name="fname"
                value={formdata.fname}
                onChange={handlechange}
                autoComplete="given-name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className="auth-field"
                label="Last name"
                fullWidth
                name="lastname"
                value={formdata.lastname}
                onChange={handlechange}
                autoComplete="family-name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <TextField
              className="auth-field"
              label="Email address"
              type="email"
              fullWidth
              name="email"
              value={formdata.email}
              onChange={handlechange}
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
              onChange={handlechange}
              autoComplete="new-password"
              helperText="At least 6 characters"
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
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              className="auth-field"
              label="Confirm password"
              type={showConfirm ? "text" : "password"}
              fullWidth
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirm((prev) => !prev)}
                      edge="end"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              className="auth-submit"
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="auth-divider">
            <span>Already have an account?</span>
          </div>

          <p className="auth-alt">
            <NavLink to="/login">Log in instead</NavLink>
          </p>

          <p className="auth-terms">
            By creating an account you agree to our <a href="/terms">terms</a>{" "}
            and <a href="/terms#privacy">privacy policy</a>.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Registercomp;

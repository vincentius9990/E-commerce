import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import WatchIcon from "@mui/icons-material/Watch";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { showError, showSuccess } from "../../../utils/alerts";
import "./footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      showError("Email required", "Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      showError("Invalid email", "Please enter a valid email address.");
      return;
    }

    showSuccess("You're subscribed!", "Watch your inbox for the latest drops.");
    setEmail("");
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <NavLink to="/" className="footer-logo">
            <WatchIcon />
            <span>
              Tech<span>Nova</span>
            </span>
          </NavLink>
          <p>
            Premium smart watches, fitness bands and accessories — designed to
            keep up with everything you do.
          </p>
          <div className="icon-footer">
            <IconButton aria-label="Facebook">
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="X">
              <XIcon />
            </IconButton>
            <IconButton aria-label="LinkedIn">
              <LinkedInIcon />
            </IconButton>
            <IconButton aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label="Pinterest">
              <PinterestIcon />
            </IconButton>
          </div>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <NavLink to="/shop">All products</NavLink>
          <NavLink to="/shop">Smart watches</NavLink>
          <NavLink to="/shop">Fitness bands</NavLink>
          <NavLink to="/shop">Accessories</NavLink>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <NavLink to="/returns">7-day returns</NavLink>
          <NavLink to="/payment-security">Payment security</NavLink>
          <NavLink to="/support">Help center</NavLink>
          <NavLink to="/contact">Contact us</NavLink>
        </div>

        <div className="footer-newsletter">
          <h4>Stay in the loop</h4>
          <p>Get new arrivals, deals and product tips in your inbox.</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <Button type="submit" variant="contained">
              Subscribe
            </Button>
          </form>
          <div className="footer-payments">
            <img src="/IMAGES/mastercard.jpg" alt="Mastercard" />
            <img src="/IMAGES/visa.jpg" alt="Visa" />
            <img src="/IMAGES/paypal.png" alt="PayPal" />
            <img src="/IMAGES/discover.jpg" alt="Discover" />
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 TechNova. All rights reserved.</span>
        <span>Privacy policy · Terms &amp; conditions</span>
      </div>
    </footer>
  );
};

export default Footer;

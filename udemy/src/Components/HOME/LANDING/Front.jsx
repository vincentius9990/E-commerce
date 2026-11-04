import React from "react";
import "./front.css";
import { Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const Front = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="hero-badge">New season · Smart wearables</span>
          <h1>
            The future of tech is <span>on your wrist</span>
          </h1>
          <p>
            Discover premium smart watches, fitness bands and accessories built
            to keep up with your day — from the morning run to the last email.
          </p>

          <div className="hero-actions">
            <Button
              variant="contained"
              size="large"
              className="hero-primary"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/shop")}
            >
              Shop now
            </Button>
            <Button
              variant="outlined"
              size="large"
              className="hero-secondary"
              onClick={() => navigate("/returns")}
            >
              Our promise
            </Button>
          </div>

          <div className="hero-stats">
            <div>
              <strong>7 days</strong>
              <span>easy returns</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>live support</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>secure payment</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-wrap">
            <img
              src="/IMAGES/apple-watch-ultra-2-7.webp"
              alt="Apple Watch Ultra 2"
            />
          </div>

          <div className="hero-float hero-float-price">
            <span>Starting at</span>
            <strong>$279</strong>
          </div>

          <div className="hero-float hero-float-rating">
            <StarIcon />
            <span>4.9 · 2k+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Front;

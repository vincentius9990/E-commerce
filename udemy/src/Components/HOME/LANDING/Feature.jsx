import React from "react";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import Card from "./MYCard";
import "./feature.css";

const features = [
  {
    image: "/IMAGES/buildquality.jpg",
    alt: "Build quality and design",
    title: "Build quality & design",
    text: "Aerospace-grade materials and a scratch-resistant display built to last.",
  },
  {
    image: "/IMAGES/batterylife.jpg",
    alt: "Excellent battery life",
    title: "Excellent battery life",
    text: "Up to 36 hours of battery, with fast charging when you need a top-up.",
  },
  {
    image: "/IMAGES/qualcomm-snapdragon-w5.webp",
    alt: "Advanced performance",
    title: "Smooth performance",
    text: "A dedicated wearable chip keeps apps, calls and sensors running fast.",
  },
  {
    image: "/IMAGES/Smart-Watch-Battery-Saving-Tips-Gear.jpg",
    alt: "Accurate activity tracking",
    title: "Accurate health tracking",
    text: "Heart rate, SpO2, sleep and 100+ workout modes tracked with precision.",
  },
];

const Feature = () => {
  const navigate = useNavigate();

  return (
    <section className="feature-section">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Why TechNova</span>
          <h2>Built for everyday adventures</h2>
          <p>
            Premium materials, all-day battery and health sensors that actually
            help you — here is what makes our collection different.
          </p>
        </div>

        <div className="feature-parent">
          <div className="feature-visual">
            <img src="/IMAGES/feature.jpg" alt="Smart watch collection" />
            <div className="feature-quote">
              <span>Designed for life</span>
              <strong>Tech that moves with you.</strong>
            </div>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <Card
                key={feature.title}
                image={feature.image}
                alt={feature.alt}
                title={feature.title}
                text={feature.text}
              />
            ))}
          </div>
        </div>

        <div className="feature-cta">
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/shop")}
            sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 600 }}
          >
            Explore the collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Feature;

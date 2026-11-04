import React from "react";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./StaticPage.css";

const StaticPage = ({ eyebrow, title, subtitle, icon, children }) => {
  return (
    <main className="static-page">
      <section className="static-hero">
        <div className="static-hero-content">
          {icon && <div className="static-hero-icon">{icon}</div>}
          {eyebrow && <span className="static-eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </section>

      <div className="static-body">
        {children}

        <div className="static-back">
          <NavLink to="/">
            <ArrowBackIcon fontSize="small" /> Back to home
          </NavLink>
        </div>
      </div>
    </main>
  );
};

export default StaticPage;

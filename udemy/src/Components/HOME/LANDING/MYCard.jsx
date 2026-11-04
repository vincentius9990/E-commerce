import React from "react";
import "./feature.css";

const MYCard = ({ image, alt, title, text }) => {
  return (
    <article className="feature-card">
      <div className="feature-card-media">
        <img src={image} alt={alt} />
      </div>
      <div className="feature-card-body">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
};

export default MYCard;

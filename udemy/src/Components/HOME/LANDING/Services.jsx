import React from "react";
import { NavLink } from "react-router-dom";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import LockIcon from "@mui/icons-material/Lock";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./Services.css";

const services = [
  {
    title: "7 days return",
    description:
      "Changed your mind? Send it back within 7 days for a fast, no-questions-asked refund.",
    link: "/returns",
    icon: <AssignmentReturnedIcon />,
  },
  {
    title: "100% payment secure",
    description:
      "Every checkout is encrypted and processed by trusted, PCI-compliant payment providers.",
    link: "/payment-security",
    icon: <LockIcon />,
  },
  {
    title: "Support 24/7",
    description:
      "Real people, around the clock. Get help with an order, a product or a return any time.",
    link: "/support",
    icon: <SupportAgentIcon />,
  },
];

const Services = () => {
  return (
    <section className="services-section">
      <div className="container">
        <div className="services-grid">
          {services.map((service) => (
            <NavLink
              to={service.link}
              className="service-card"
              key={service.title}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="service-more">
                Learn more <ArrowForwardIcon />
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

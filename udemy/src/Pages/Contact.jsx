import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import { showError, showSuccess } from "../utils/alerts";
import "./Contact.css";

const contactDetails = [
  {
    icon: <EmailIcon />,
    title: "Email us",
    lines: ["support@technova.com", "We reply within 2 hours"],
  },
  {
    icon: <PhoneIcon />,
    title: "Call us",
    lines: ["+1 (800) 555-0199", "Mon–Sun, 24 hours"],
  },
  {
    icon: <LocationOnIcon />,
    title: "Visit us",
    lines: ["221 Market Street", "San Francisco, CA 94105"],
  },
  {
    icon: <AccessTimeIcon />,
    title: "Support hours",
    lines: ["24 hours a day", "7 days a week"],
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name.trim() === "" ||
      formData.email.trim() === "" ||
      formData.message.trim() === ""
    ) {
      showError("Missing details", "Please fill in all the fields below.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      showError("Invalid email", "Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
      showSuccess("Message sent", "We'll get back to you as soon as possible.");
    }, 600);
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <span className="section-eyebrow contact-eyebrow">Get in touch</span>
          <h1>We&apos;d love to hear from you</h1>
          <p>
            Questions about an order, a product or a return? Send us a message
            and our team will help you out.
          </p>
        </div>
      </section>

      <div className="container contact-layout">
        <aside className="contact-info">
          <h2>Contact information</h2>
          <p className="contact-info-text">
            Prefer to reach us directly? Use any of the channels below — we are
            available around the clock.
          </p>

          <div className="contact-info-list">
            {contactDetails.map((item) => (
              <div className="contact-info-card" key={item.title}>
                <div className="contact-info-icon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  {item.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="contact-form-card">
          <h2>Send us a message</h2>
          <p className="contact-form-text">
            Fill in the form and we&apos;ll get back to you within two hours.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Jane Doe"
                onChange={handleChange}
                value={formData.name}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="How can we help?"
                onChange={handleChange}
                value={formData.message}
              ></textarea>
            </div>

            <Button
              type="submit"
              variant="contained"
              size="large"
              className="contact-submit"
              endIcon={<SendIcon />}
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send message"}
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Contact;

import React from "react";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { NavLink } from "react-router-dom";
import StaticPage from "../Components/Static/StaticPage";

const Support = () => {
  return (
    <StaticPage
      eyebrow="Support 24/7"
      title="We're here around the clock"
      subtitle="Questions about an order, a product, or a return? Our team is available every day, at any hour."
      icon={<SupportAgentIcon />}
    >
      <section className="static-section">
        <h2>Get in touch</h2>
        <div className="static-grid">
          <div className="static-card">
            <h3>Email us</h3>
            <p>
              support@technova.com
              <br />
              We reply within 2 hours, day or night.
            </p>
          </div>
          <div className="static-card">
            <h3>Call us</h3>
            <p>
              +1 (800) 555-0199
              <br />
              Available 24 hours a day, 7 days a week.
            </p>
          </div>
          <div className="static-card">
            <h3>Live chat</h3>
            <p>
              Tap the chat bubble in the corner of any page to talk to a real
              person in minutes.
            </p>
          </div>
        </div>
      </section>

      <section className="static-section">
        <h2>Frequently asked questions</h2>
        <div className="static-steps">
          <div className="static-step">
            <div>
              <h3>How long does shipping take?</h3>
              <p>
                Standard delivery takes 3–5 business days. Express delivery
                arrives within 1–2 business days.
              </p>
            </div>
          </div>
          <div className="static-step">
            <div>
              <h3>Can I change my order after placing it?</h3>
              <p>
                Yes — contact us within 1 hour of ordering and we will update or
                cancel it before it ships.
              </p>
            </div>
          </div>
          <div className="static-step">
            <div>
              <h3>How do I track my order?</h3>
              <p>
                A tracking link is emailed as soon as your parcel leaves our
                warehouse. You can also ask us for an update at any time.
              </p>
            </div>
          </div>
          <div className="static-step">
            <div>
              <h3>Is my payment information safe?</h3>
              <p>
                Absolutely. All payments are encrypted and processed by trusted
                providers. See our payment security page for details.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="static-cta">
        <h2>Still need help?</h2>
        <p>Send us a message and we will get back to you right away.</p>
        <NavLink to="/contact" className="static-button">
          Contact us
        </NavLink>
      </div>
    </StaticPage>
  );
};

export default Support;

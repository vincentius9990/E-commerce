import React from "react";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import { NavLink } from "react-router-dom";
import StaticPage from "../Components/Static/StaticPage";

const Returns = () => {
  return (
    <StaticPage
      eyebrow="7 Days Return"
      title="Easy, hassle-free returns"
      subtitle="Changed your mind? You have 7 days from delivery to return your purchase — no complicated forms, no stress."
      icon={<AssignmentReturnedIcon />}
    >
      <section className="static-section">
        <h2>How returns work</h2>
        <div className="static-steps">
          <div className="static-step">
            <span className="static-step-number">1</span>
            <div>
              <h3>Start your return</h3>
              <p>
                Contact our support team with your order number and the item
                you would like to return. We will confirm your request within
                24 hours.
              </p>
            </div>
          </div>
          <div className="static-step">
            <span className="static-step-number">2</span>
            <div>
              <h3>Pack the item</h3>
              <p>
                Place the item back in its original packaging with all
                accessories and tags. Attach the prepaid return label we send
                you.
              </p>
            </div>
          </div>
          <div className="static-step">
            <span className="static-step-number">3</span>
            <div>
              <h3>Get your refund</h3>
              <p>
                Once the item reaches our warehouse and passes inspection, your
                refund is issued to the original payment method within 5–7
                business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="static-section">
        <h2>Return policy</h2>
        <ul className="static-list">
          <li>Returns are accepted within 7 days of delivery.</li>
          <li>Items must be unused and in their original packaging.</li>
          <li>Proof of purchase or order number is required.</li>
          <li>Free returns for defective or incorrectly shipped items.</li>
          <li>Personalised or hygiene-sensitive items cannot be returned.</li>
          <li>Refunds are issued to the original payment method.</li>
        </ul>
      </section>

      <div className="static-cta">
        <h2>Need help with a return?</h2>
        <p>Our support team is available 24/7 to guide you through it.</p>
        <NavLink to="/support" className="static-button">
          Contact support
        </NavLink>
      </div>
    </StaticPage>
  );
};

export default Returns;

import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import { NavLink } from "react-router-dom";
import StaticPage from "../Components/Static/StaticPage";

const PaymentSecurity = () => {
  return (
    <StaticPage
      eyebrow="100% Payment Secure"
      title="Your payments are protected"
      subtitle="Every transaction is encrypted and handled by trusted payment providers. Your card details never touch our servers."
      icon={<LockIcon />}
    >
      <section className="static-section">
        <h2>How we protect you</h2>
        <div className="static-grid">
          <div className="static-card">
            <h3>Encrypted checkout</h3>
            <p>
              All traffic between your browser and our store is secured with
              TLS encryption, so your details cannot be intercepted.
            </p>
          </div>
          <div className="static-card">
            <h3>Trusted gateways</h3>
            <p>
              Payments are processed by PCI-DSS compliant providers such as
              Stripe and PayPal — never directly by our store.
            </p>
          </div>
          <div className="static-card">
            <h3>No card details stored</h3>
            <p>
              We never see or save your full card number, CVV, or banking
              credentials on our servers.
            </p>
          </div>
          <div className="static-card">
            <h3>Fraud monitoring</h3>
            <p>
              Suspicious activity is automatically flagged and reviewed to keep
              both buyers and sellers safe.
            </p>
          </div>
        </div>
      </section>

      <section className="static-section">
        <h2>Accepted payment methods</h2>
        <ul className="static-list">
          <li>Visa, Mastercard, and American Express</li>
          <li>PayPal</li>
          <li>Apple Pay and Google Pay</li>
          <li>Debit cards and secure bank transfers</li>
          <li>Cash on delivery for eligible orders</li>
        </ul>
      </section>

      <section className="static-section">
        <h2>Safe shopping tips</h2>
        <ul className="static-list">
          <li>Always check that the site address starts with https://.</li>
          <li>Never share your one-time password (OTP) with anyone.</li>
          <li>Use a strong, unique password for your account.</li>
          <li>Contact us immediately if you notice an unknown charge.</li>
        </ul>
      </section>

      <div className="static-cta">
        <h2>Something looks wrong?</h2>
        <p>Report a suspicious payment and our team will investigate.</p>
        <NavLink to="/support" className="static-button">
          Get help
        </NavLink>
      </div>
    </StaticPage>
  );
};

export default PaymentSecurity;

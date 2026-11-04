import React from "react";
import GavelIcon from "@mui/icons-material/Gavel";
import StaticPage from "../Components/Static/StaticPage";

const Terms = () => {
  return (
    <StaticPage
      eyebrow="Legal"
      title="Terms & conditions"
      subtitle="The simple rules that apply when you shop with TechNova."
      icon={<GavelIcon />}
    >
      <section className="static-section">
        <h2>Using our store</h2>
        <p>
          By browsing or purchasing from TechNova you agree to use the store
          lawfully and to provide accurate information at checkout. Product
          availability and pricing may change without notice.
        </p>
      </section>

      <section className="static-section">
        <h2>Orders and payment</h2>
        <p>
          All orders are subject to availability and payment authorisation.
          Prices are shown in US dollars and include applicable taxes unless
          stated otherwise. We reserve the right to cancel an order if a pricing
          error or suspected fraud is detected.
        </p>
        <ul className="static-list">
          <li>Payments are processed by PCI-compliant providers.</li>
          <li>You will receive an email confirmation after checkout.</li>
          <li>Orders are shipped within 1–2 business days.</li>
        </ul>
      </section>

      <section className="static-section">
        <h2>Returns and refunds</h2>
        <p>
          You can return most items within 7 days of delivery for a refund,
          provided they are in their original condition. Refunds are issued to
          the original payment method once the return is received and inspected.
        </p>
      </section>

      <section className="static-section" id="privacy">
        <h2>Privacy policy</h2>
        <p>
          We collect only the information needed to process your order and
          improve your shopping experience — your name, contact details, delivery
          address and order history.
        </p>
        <ul className="static-list">
          <li>We never sell your personal data.</li>
          <li>Payment card details are handled by our payment providers.</li>
          <li>You can request deletion of your account data at any time.</li>
        </ul>
      </section>

      <section className="static-section">
        <h2>Contact</h2>
        <p>
          Questions about these terms? Reach us through the{" "}
          <a href="/contact">contact page</a> or email support@technova.com.
        </p>
      </section>
    </StaticPage>
  );
};

export default Terms;

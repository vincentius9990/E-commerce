import React, { useState } from "react";
import "./checkout.css";
import { useCart } from "react-use-cart";
import { Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/alerts";

const shippingOptions = [
  { label: "Standard Shipping", detail: "5 to 7 days", cost: 4 },
  { label: "Express Shipping", detail: "2 to 3 days", cost: 12 },
  { label: "Next Day Delivery", detail: "Order before 4pm", cost: 24 },
];

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [payment, setpayment] = useState({
    cardNumber: "",
    nameOnCard: "",
    expirationDate: "",
    cvv: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [ship, setship] = useState({ shippingMethod: "" });
  const [contactinfo, setcontactinfo] = useState({ email: "", phone: "" });
  const [placing, setPlacing] = useState(false);

  const { items, emptyCart } = useCart();
  const navigate = useNavigate();

  const shippingCost =
    shippingOptions.find((option) => option.label === ship.shippingMethod)
      ?.cost || 4;

  const subtotal = items.reduce((acc, item) => {
    const line = item.price * item.quantity;
    return acc + line - ((item.discountPercentage || 0) / 100) * line;
  }, 0);

  const discountTotal = items.reduce((acc, item) => {
    return (
      acc + ((item.discountPercentage || 0) / 100) * item.price * item.quantity
    );
  }, 0);

  const total = subtotal + shippingCost;

  const handlePlaceOrder = () => {
    const { line1, city, state, zip } = shippingAddress;
    if (
      line1.trim() === "" ||
      city === "" ||
      zip === "" ||
      state === ""
    ) {
      showError(
        "Shipping address incomplete",
        "Please fill out all required shipping address fields."
      );
      return;
    }

    const { cardNumber, nameOnCard, expirationDate, cvv } = payment;
    if (
      cardNumber.trim() === "" ||
      nameOnCard.trim() === "" ||
      expirationDate.trim() === "" ||
      cvv.trim() === ""
    ) {
      showError(
        "Payment information missing",
        "Please fill out your payment details."
      );
      return;
    }

    const { email, phone } = contactinfo;
    if (email.trim() === "" || phone.trim() === "") {
      showError(
        "Contact information missing",
        "Please fill out your contact information."
      );
      return;
    }

    if (ship.shippingMethod === "") {
      showError("Shipping method required", "Please select a shipping method.");
      return;
    }

    if (!termsAccepted) {
      showError(
        "Terms not accepted",
        "Please accept the terms and conditions to proceed."
      );
      return;
    }

    setPlacing(true);

    const order = {
      ...shippingAddress,
      ...payment,
      ...contactinfo,
      ...ship,
      Subtotal: subtotal,
      discount: Math.round(discountTotal),
      shippingcost: shippingCost,
      total,
    };

    API.post("/ship", order)
      .then(() => {
        setPlacing(false);
        showSuccess("Order placed", "Thank you — your order is on its way.");
        emptyCart();
        setTimeout(() => {
          navigate("/");
        }, 1600);
      })
      .catch(() => {
        setPlacing(false);
        showError(
          "Order failed",
          "We couldn't place your order. Please try again."
        );
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handlepaymentinput = (e) => {
    const { name, value } = e.target;
    setpayment({ ...payment, [name]: value });
  };

  const handlecontactinfo = (e) => {
    const { name, value } = e.target;
    setcontactinfo({ ...contactinfo, [name]: value });
  };

  const handleshipchange = (method) => {
    setship({ shippingMethod: method });
  };

  if (items.length === 0) {
    return (
      <main className="checkout-empty">
        <h1>Your cart is empty</h1>
        <p>Add a product to your cart before heading to checkout.</p>
        <Button variant="contained" size="large" onClick={() => navigate("/shop")}>
          Browse products
        </Button>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container">
        <div className="checkout-head">
          <span className="section-eyebrow">Secure checkout</span>
          <h1>Complete your order</h1>
          <p>
            You&apos;re moments away from your new tech. All transactions are
            encrypted and protected.
          </p>
        </div>

        <div className="checkout-layout">
          <div className="checkout-main">
            <section className="checkout-card">
              <div className="checkout-card-head">
                <h2>Contact information</h2>
              </div>
              <div className="checkout-grid">
                <label className="checkout-field">
                  <span>Email address</span>
                  <input
                    required
                    type="email"
                    placeholder="jane@example.com"
                    name="email"
                    value={contactinfo.email}
                    onChange={handlecontactinfo}
                  />
                </label>
                <label className="checkout-field">
                  <span>Phone number</span>
                  <input
                    required
                    type="tel"
                    placeholder="+1 555 000 0000"
                    name="phone"
                    value={contactinfo.phone}
                    onChange={handlecontactinfo}
                  />
                </label>
              </div>
            </section>

            <section className="checkout-card">
              <div className="checkout-card-head">
                <h2>Shipping address</h2>
              </div>
              <div className="checkout-grid">
                <label className="checkout-field checkout-field-wide">
                  <span>Address line 1</span>
                  <input
                    required
                    type="text"
                    placeholder="221 Market Street"
                    name="line1"
                    value={shippingAddress.line1}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="checkout-field checkout-field-wide">
                  <span>Address line 2 (optional)</span>
                  <input
                    type="text"
                    placeholder="Apartment, suite, etc."
                    name="line2"
                    value={shippingAddress.line2}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="checkout-field">
                  <span>City</span>
                  <input
                    required
                    type="text"
                    placeholder="San Francisco"
                    name="city"
                    onChange={handleInputChange}
                    value={shippingAddress.city}
                  />
                </label>
                <label className="checkout-field">
                  <span>State</span>
                  <input
                    required
                    type="text"
                    placeholder="CA"
                    name="state"
                    onChange={handleInputChange}
                    value={shippingAddress.state}
                  />
                </label>
                <label className="checkout-field">
                  <span>ZIP code</span>
                  <input
                    required
                    type="text"
                    placeholder="94105"
                    name="zip"
                    onChange={handleInputChange}
                    value={shippingAddress.zip}
                  />
                </label>
              </div>
            </section>

            <section className="checkout-card">
              <div className="checkout-card-head">
                <h2>
                  <LocalShippingOutlinedIcon /> Shipping method
                </h2>
              </div>
              <div className="shipping-options">
                {shippingOptions.map((option) => (
                  <label
                    key={option.label}
                    className={`shipping-option ${
                      ship.shippingMethod === option.label ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={option.label}
                      checked={ship.shippingMethod === option.label}
                      onChange={() => handleshipchange(option.label)}
                    />
                    <span className="shipping-option-copy">
                      <strong>{option.label}</strong>
                      <span>{option.detail}</span>
                    </span>
                    <span className="shipping-option-price">
                      ${option.cost.toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <section className="checkout-card">
              <div className="checkout-card-head">
                <h2>
                  <LockOutlinedIcon /> Payment information
                </h2>
              </div>
              <div className="checkout-grid">
                <label className="checkout-field checkout-field-wide">
                  <span>Card number</span>
                  <input
                    required
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    name="cardNumber"
                    onChange={handlepaymentinput}
                    value={payment.cardNumber}
                  />
                </label>
                <label className="checkout-field checkout-field-wide">
                  <span>Name on card</span>
                  <input
                    required
                    type="text"
                    placeholder="Jane Doe"
                    name="nameOnCard"
                    onChange={handlepaymentinput}
                    value={payment.nameOnCard}
                  />
                </label>
                <label className="checkout-field">
                  <span>Expiration date</span>
                  <input
                    required
                    type="text"
                    placeholder="MM/YY"
                    name="expirationDate"
                    onChange={handlepaymentinput}
                    value={payment.expirationDate}
                  />
                </label>
                <label className="checkout-field">
                  <span>CVV</span>
                  <input
                    required
                    type="text"
                    placeholder="123"
                    name="cvv"
                    onChange={handlepaymentinput}
                    value={payment.cvv}
                  />
                </label>
              </div>
            </section>
          </div>

          <aside className="checkout-summary">
            <h2>Order summary</h2>

            <div className="checkout-items">
              {items.map((item) => (
                <div className="checkout-item" key={item.id}>
                  <div className="checkout-item-image">
                    <img
                      src={item.thumbnail || item.image}
                      alt={item.title}
                    />
                    <span className="checkout-item-qty">{item.quantity}</span>
                  </div>
                  <div className="checkout-item-copy">
                    <h3>{item.title}</h3>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                  <strong>
                    $
                    {(
                      item.price * item.quantity -
                      ((item.discountPercentage || 0) / 100) *
                        item.price *
                        item.quantity
                    ).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountTotal > 0 && (
              <div className="summary-row summary-discount">
                <span>Discount</span>
                <span>-${discountTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <label className="checkout-terms">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span>
                I agree to the <a href="/terms">terms and conditions</a>
              </span>
            </label>

            <Button
              variant="contained"
              size="large"
              fullWidth
              className="checkout-place-order"
              endIcon={<ArrowForwardIcon />}
              onClick={handlePlaceOrder}
              disabled={placing}
            >
              {placing ? "Placing order..." : "Place order"}
            </Button>

            <p className="checkout-secure">
              <LockOutlinedIcon fontSize="small" /> Payments are encrypted and
              secure
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Checkout;

import React from "react";
import "./cart.css";
import { Button, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useCart } from "react-use-cart";
import { NavLink, useNavigate } from "react-router-dom";

const Cart = () => {
  const { removeItem, items, updateItemQuantity, emptyCart } = useCart();
  const navigate = useNavigate();

  const deleteItem = (id) => {
    removeItem(id);
  };

  const getDiscount = (item) => item.discountPercentage || 0;

  const getLineTotal = (item) => {
    const line = item.price * item.quantity;
    return line - (getDiscount(item) / 100) * line;
  };

  const calculateTotalPrice = () => {
    let total = 0;
    items.forEach((item) => {
      total += getLineTotal(item);
    });
    return Number(total.toFixed(2));
  };

  const calculateDiscount = () => {
    let discount = 0;
    items.forEach((item) => {
      discount +=
        (getDiscount(item) / 100) * item.price * item.quantity;
    });
    return Number(discount.toFixed(2));
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {items.length > 0 ? (
        <main className="cart-page">
          <div className="container">
            <div className="cart-head">
              <div>
                <span className="section-eyebrow">Your bag</span>
                <h1>Shopping cart</h1>
                <p>
                  {itemCount} {itemCount === 1 ? "item" : "items"} ready for
                  checkout.
                </p>
              </div>
              <button className="cart-clear" onClick={() => emptyCart()}>
                Clear cart
              </button>
            </div>

            <div className="cart-layout">
              <section className="cart-items">
                <div className="cart-row cart-row-head">
                  <span>Product</span>
                  <span>Quantity</span>
                  <span>Total</span>
                </div>

                {items.map((item) => (
                  <article className="cart-row" key={item.id}>
                    <div className="cart-product">
                      <div className="cart-image">
                        <img
                          src={item.thumbnail || item.image}
                          alt={item.title}
                        />
                      </div>
                      <div className="cart-product-info">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <span className="cart-unit-price">
                          ${item.price.toFixed(2)} each
                        </span>
                        <button
                          className="cart-remove"
                          onClick={() => deleteItem(item.id)}
                          aria-label={`Remove ${item.title}`}
                        >
                          <DeleteOutlineIcon fontSize="small" /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="cart-qty">
                      <IconButton
                        size="small"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <span>{item.quantity}</span>
                      <IconButton
                        size="small"
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </div>

                    <div className="cart-line-total">
                      <strong>${getLineTotal(item).toFixed(2)}</strong>
                      {getDiscount(item) > 0 && (
                        <>
                          <del>${(item.price * item.quantity).toFixed(2)}</del>
                          <span className="cart-discount">
                            {Math.round(getDiscount(item))}% off
                          </span>
                        </>
                      )}
                    </div>
                  </article>
                ))}
              </section>

              <aside className="cart-summary">
                <h2>Order summary</h2>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>
                    ${(calculateTotalPrice() + calculateDiscount()).toFixed(2)}
                  </span>
                </div>

                {calculateDiscount() > 0 && (
                  <div className="summary-row summary-discount">
                    <span>Discount</span>
                    <span>-${calculateDiscount().toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="summary-total">
                  <span>Total</span>
                  <strong>${calculateTotalPrice()}</strong>
                </div>

                <NavLink to="/checkout" className="cart-checkout-link">
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                  >
                    Proceed to checkout
                  </Button>
                </NavLink>

                <NavLink to="/shop" className="cart-continue">
                  Continue shopping
                </NavLink>

                <p className="cart-note">
                  Secure checkout · 7-day returns · 24/7 support
                </p>
              </aside>
            </div>
          </div>
        </main>
      ) : (
        <main className="empty-cart">
          <img
            src="/IMAGES/undraw_empty_cart_co35.png"
            alt="An empty shopping cart"
          />
          <div className="empty-cart-copy">
            <div className="empty-cart-icon">
              <ShoppingBagOutlinedIcon />
            </div>
            <h1>Your cart is empty</h1>
            <p>
              Looks like you haven&apos;t added anything yet. Explore the latest
              smart watches and accessories.
            </p>
            <div className="empty-cart-actions">
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/shop")}
              >
                Start shopping
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/")}
              >
                Back to homepage
              </Button>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Cart;

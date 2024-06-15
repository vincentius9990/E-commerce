import React from "react";
import "./cart.css";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "react-use-cart";
import { IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { removeItem, items, updateItemQuantity, emptyCart } = useCart();
const navigate=useNavigate();
  const deleteItem = (id) => {
    removeItem(id);
  };

  const calculateTotalPrice = () => {
    let Totalprice = 0;
    items.forEach((item) => {
      Totalprice = Totalprice + item.price * item.quantity-(item.discountPercentage/100*item.price*item.quantity);
    });

    return Number(Totalprice.toFixed(2));
  };

  return (
    <>
      {items.length > 0 ? (
        <div className="parent-cart">
          <div className="wrapper-cart">
            <div className="cart-title">
              <div className="cart-title-1">Description</div>
              <div className="cart-title-2">Quantity</div>
              <div className="cart-title-3">Remove</div>
              <div className="cart-title-4">Price</div>
            </div>
            {items.map((item) => (
              <div className="child-cart" key={item.id}>
                <div className="image-container">
                  <img src={item.thumbnail}></img>
                </div>
                <div className="child-cart-1">
                  {<div className="child-cart-1-title">{item.title}</div>}
                  <div className="child-cart-1-description">
                    {item.description}
                  </div>
                </div>
                <div className="child-cart-2">
                  <Button
                    variant="contained"
                    className="button-cart"
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </Button>
                  {item.quantity} {/* Display item quantity */}
                  <Button
                    variant="contained"
                    className="button-cart"
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </div>
                <div className="child-cart-3">
                  <IconButton
                    color="primary"
                    onClick={() => deleteItem(item.id)}
                    className="delete-cart-item"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
                <div className="child-cart-4-parent">
                  {" "}
                  <div className="child-cart-4">
                    <h2>
                      {"$"}
                      {Number((
                        item.price * item.quantity -
                          (item.discountPercentage / 100) *
                            (item.price * item.quantity)
                      ).toFixed(2))}{" "}
                    </h2>
                    <del> {"$" + item.price * item.quantity} </del>
                  </div>
                  <div className="discount-heading">
                    <h4 className="discount-cart">{`${Math.round(
                      item.discountPercentage
                    )}% off`}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="footer-button">
            <Button
              variant="text"
              className="clear-all"
              onClick={() => emptyCart()}
            >
              Clear ALL
            </Button>
            <h2> Total Price: ${calculateTotalPrice()} </h2>
            <NavLink to="/checkout">
              <br></br><Button  className="clear-all-buy" variant="contained">
                PROCEED TO PAY</Button>
            </NavLink>
            
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <img src="\IMAGES\undraw_empty_cart_co35.png"></img>
          <h1>Cart is empty</h1>
          <Button variant='contained' className='empty-cart-button' onClick={()=>{navigate('/')}}>Back to homepage</Button>
        </div>
      )}
    </>
  );
};
export default Cart;

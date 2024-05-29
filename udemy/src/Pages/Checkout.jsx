import React, { useState } from 'react';
import './checkout.css';
import { useCart } from "react-use-cart";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const Checkout = () => {
    const [shippingAddress, setShippingAddress] = useState({});
    const [billingAddress, setBillingAddress] = useState({});
    const [termsAccepted, setTermsAccepted] = useState(false);
    const { items, updateItemQuantity, emptyCart } = useCart();
const navigate=useNavigate();
    const handlePlaceOrder = () => {
        if (termsAccepted) {
            // Proceed with order placement
            console.log("Order placed successfully");
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Order placed successfully",
                showConfirmButton: false,
                timer: 1500
              });
       setTimeout(() => {
        navigate('/');
       }, 1500);
       
            } else {
            // alert('Please accept the terms and conditions to proceed.');
            Swal.fire({
                icon: "error",
                title: "Please accept the terms and conditions to proceed"
              });
              
        }
    };

    const handleInputChange = (e, setState) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e, setState) => {
        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const Subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
let discount_sum=0;
    items.forEach((items)=>{
     discount_sum=discount_sum+items.discountPercentage/100*items.price;})
    
discount_sum=Math.round(discount_sum);
let shipping=4;
let total=Subtotal-discount_sum-shipping;


    return (
        <div className="checkout">
            <h2>Shipping Address</h2>
            
            <input required type="text" placeholder="Address Line 1" name="line1" onChange={(e) => handleInputChange(e, setShippingAddress)} />
            <input required type="text" placeholder="Address Line 2" name="line2" onChange={(e) => handleInputChange(e, setShippingAddress)} />
            <input required type="text" placeholder="City" name="city" onChange={(e) => handleInputChange(e, setShippingAddress)} />
            <input required type="text" placeholder="State" name="state" onChange={(e) => handleInputChange(e, setShippingAddress)} />
            <input required type="text" placeholder="Zip Code" name="zip" onChange={(e) => handleInputChange(e, setShippingAddress)} />

            <h2>Billing Address</h2>
            <input required type="checkbox" onChange={(e) => handleCheckboxChange(e, setBillingAddress)} /> Same as shipping address
            <input required type="text" placeholder="Address Line 1" name="line1" onChange={(e) => handleInputChange(e, setBillingAddress)} />
            <input required type="text" placeholder="Address Line 2" name="line2" onChange={(e) => handleInputChange(e, setBillingAddress)} />
            <input required type="text" placeholder="City" name="city" onChange={(e) => handleInputChange(e, setBillingAddress)} />
            <input required type="text" placeholder="State" name="state" onChange={(e) => handleInputChange(e, setBillingAddress)} />
            <input required type="text" placeholder="Zip Code" name="zip" onChange={(e) => handleInputChange(e, setBillingAddress)} />

            <h2>Payment Information</h2>
            <input required type="text" placeholder="Card Number" name="cardNumber" onChange={(e) => handleInputChange(e, setPaymentDetails)} />
            <input  required type="text" placeholder="Name on Card" name="nameOnCard" onChange={(e) => handleInputChange(e, setPaymentDetails)} />
            <input required type="text" placeholder="Expiration Date (MM/YY)" name="expirationDate" onChange={(e) => handleInputChange(e, setPaymentDetails)} />
            <input required type="text" placeholder="CVV" name="cvv" onChange={(e) => handleInputChange(e, setPaymentDetails)} />

            <h2>Contact Information</h2>
            <input required type="email" placeholder="Email Address" name="email" onChange={(e) => handleInputChange(e, setContactInfo)} />
            <input required type="tel" placeholder="Phone Number" name="phone" onChange={(e) => handleInputChange(e, setContactInfo)} />

            <h2>Order Summary</h2>
            <div className="order-summary">
                
                <p>Subtotal ${Subtotal}</p>
                <hr/>
                <p>Discount:-${discount_sum}</p>
                <hr/>
                <p>Shipping:${shipping}</p>
                <hr/>
                <p>Total:${total}</p>
                <hr/>
            
            </div>

            <h2>Shipping Method</h2>
            <select name="shippingMethod">
                <option>Standard Shipping - 5 to 7 days</option>
                <option>Express Shipping - 2 to 3 days</option>
                <option>Next Day Delivery</option>
            </select>

            <h2>Review Order</h2>
            <div className="review-order">
                <p>Shipping to: {shippingAddress.line1}, {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.zip}</p>
                <p>Billing to: {billingAddress.line1}, {billingAddress.city}, {billingAddress.state}, {billingAddress.zip}</p>
                <p>Payment method: Visa ending in ****</p>
                <p>Total: ${total}</p>
            </div>

            <div>
                <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label>
                    I agree to the <a href="/terms">terms and conditions</a>
                </label>
            </div>

            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
};

export default Checkout;

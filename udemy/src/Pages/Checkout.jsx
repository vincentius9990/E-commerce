import React, { useState } from "react";
import "./checkout.css";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
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
  const[ship,setship]=useState({shippingMethod:''});
const[contactinfo,setcontactinfo]=useState({email:'',phone:''});
const[amount,setamount]=useState({subtotal:'',discount:'',shippingcost:'',total:''})
  const { items, updateItemQuantity, emptyCart } = useCart();
  const navigate = useNavigate();
  const handlePlaceOrder = () => {
      if(!termsAccepted){
        Swal.fire({
          icon: "error",
          title: "Please accept the terms and conditions to proceed",
        });
      return;
      }

const{line1,line2,city,state,zip}=shippingAddress;
      if(line1.trim()===''|| line2.trim()===''||city===""||zip===''||state==='')
{
  Swal.fire({
    icon: "error",
    title: "Please fill out all required shipping address fields",
  });
  return;
}

const{cardNumber,nameOnCard,expirationDate,cvv}=payment;
if(cardNumber.trim()===''||nameOnCard.trim()===''||expirationDate.trim()===''||cvv.trim()==='')
{
  Swal.fire({
    icon: "error",
    title: "Please fill out Payment Information",
  });
  return;
}

const{email,phone}=contactinfo;
if(email.trim()===''||phone.trim()==='')
  {
    Swal.fire({
      icon: "error",
      title: "Please fill out Contact Information",
    });
    return;
  }

const{shippingMethod}=ship;
if(shippingMethod==='')
  {

    Swal.fire({
      icon: "error",
      title: "Please select a Shipping Method",
    });
    return;


  }





      // Proceed with order placement
      console.log("Order placed successfully");
      const obj={...shippingAddress,...payment,...contactinfo,...ship,...amount};
      axios.post('http://localhost:3000/ship',obj).then(()=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Order placed successfully",
          showConfirmButton: false,
          timer: 1500,
        });
     
     
     
     
      }).catch((e)=>{

alert(e);

      })
      
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } 
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handlepaymentinput = (e) => {
    const { name, value } = e.target;

    setpayment({ ...payment, [name]: value });
  };



  const handlecontactinfo=(e)=>{
const{name,value}=e.target;

setcontactinfo({...contactinfo,[name]:value});

  }

  const handleshipchange=(e)=>{

const{name,value}=e.target;
setship({...ship,[name]:value});

  }

  const Subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity-item.discountPercentage/100*item.price*item.quantity,
    0
  );
  let discount_sum = 0;
  
  items.forEach((items) => {
    discount_sum =
      discount_sum + (items.discountPercentage / 100) * items.price;
  });

  discount_sum = Math.round(discount_sum);
  let shipping = 4;
  let total = Subtotal - shipping;

  setTimeout(()=>{
    setamount({Subtotal:Subtotal,discount:discount_sum,shippingcost:shipping,total:total});
  },3000)






  return (
    <div className="checkout">
    
    <h2>Shipping Address</h2>

      <input
        required
        type="text"
        placeholder="Address Line 1"
        name="line1"
        value={shippingAddress.line1}
        onChange={handleInputChange}
      />
      <input
        required
        type="text"
        placeholder="Address Line 2"
        name="line2"
        onChange={handleInputChange}
        value={shippingAddress.line2}
      />
      <input
        required
        type="text"
        placeholder="City"
        name="city"
        onChange={handleInputChange}
        value={shippingAddress.city}
      />
      <input
        required
        type="text"
        placeholder="State"
        name="state"
        onChange={handleInputChange}
        value={shippingAddress.state}
      />
      <input
        required
        type="text"
        placeholder="Zip Code"
        name="zip"
        onChange={handleInputChange}
        value={shippingAddress.zip}
      />
     
      <h2>Payment Information</h2>
      <input
        required
        type="text"
        placeholder="Card Number"
        name="cardNumber"
        onChange={handlepaymentinput}
        value={payment.cardNumber}
      />
      <input
        required
        type="text"
        placeholder="Name on Card"
        name="nameOnCard"
        onChange={handlepaymentinput}
        value={payment.nameOnCard}
      />
      <input
        required
        type="text"
        placeholder="Expiration Date (MM/YY)"
        name="expirationDate"
        onChange={handlepaymentinput}
        value={payment.expirationDate}
      />
      <input
        required
        type="text"
        placeholder="CVV"
        name="cvv"
        onChange={handlepaymentinput}
        value={payment.cvv}
      />

      <h2>Contact Information</h2>
      <input
        required
        type="email"
        placeholder="Email Address"
        name="email"
        value={contactinfo.email}
        onChange={handlecontactinfo}
      />
      <input
        required
        type="tel"
        placeholder="Phone Number"
        name="phone"
        value={contactinfo.phone}
        onChange={handlecontactinfo}
      />

      <h2>Order Summary</h2>
      <div className="order-summary">
        <p>Subtotal ${Subtotal.toFixed(2)}</p>
        <hr />
        <p>Discount:-${discount_sum}(included in subtotal)</p>
        <hr />
        <p>Shipping:${shipping}</p>
        <hr />
        <p>Total:${total.toFixed(2)}</p>
        <hr />
      </div>

      <h2>Shipping Method</h2>
      <select name="shippingMethod" onChange={handleshipchange}>
      <option>select</option>
        <option >Standard Shipping - 5 to 7 days</option>
        <option >Express Shipping - 2 to 3 days</option>
        <option >Next Day Delivery</option>
      </select>

      <h2>Review Order</h2>
      <div className="review-order">
        <p>
          Shipping to: {shippingAddress.line1}, {shippingAddress.city},{" "}
          {shippingAddress.state}, {shippingAddress.zip}
        </p>
        <p>Payment method: Visa ending in ****</p>
        <p>Total: ${total.toFixed(2)}</p>
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

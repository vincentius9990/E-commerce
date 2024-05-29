import React, { useState } from "react";
import "./Contact.css";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [alert, setalert] = useState(false);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    //state updation based on the new value
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
  };

  const handlesubmit = () => {
    if (
      formData.name === "" ||
      formData.email === '' ||
      formData.message === "" ||
      required===true
    ) {
      Swal.fire({
        position:"center",
        icon: "error",
        title: "Oops...",
        text: "Blank values not allowed",
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Message successfully sent",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="contact-form-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          {/*cannot use for to bind to input element as for is a reserved word in javascript */}
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            onChange={handleChange}
            value={formData.message}
          ></textarea>
        </div>
        <button type="submit" className="submit-button" onClick={handlesubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;

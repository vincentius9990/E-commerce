const User = require("../models/userschema");
const bcrypt = require("bcryptjs"); // Used for password hashing
const jwt = require("jsonwebtoken"); // Importing jwt
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

// Controller function for creating a new user
const createUser = async (req, res) => {
  try {
    const { fname, lastname, email, password } = req.body;

    const existingusers = await User.findOne({ email });
    if (existingusers) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new User({
      fname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newuser.save();
    res.status(200).json({
      message: "Signup successful. Please Sign in.",
      user: newuser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while registering" });
  }
};

// Controller function for finding a user
const finduser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) { // Checking if the user exists
      return res.status(400).json({ error: "Invalid email" });
    }

    const result = await bcrypt.compare(password, user.password); // Await the result of bcrypt.compare
    if (!result) {
      console.log(result); // If passwords do not match
      return res.status(401).json({ error: "Password is incorrect" });
    }

    // If user is found and passwords match
    const token = jwt.sign({ email: user.email }, secretKey);
    console.log("Generated Token:", token);
    return res.status(200).json({message:"login successful",token:token}); // Sending the token in the JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

module.exports = { createUser, finduser };

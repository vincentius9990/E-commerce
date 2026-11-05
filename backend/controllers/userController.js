const User = require("../models/userschema");
const bcrypt = require("bcryptjs"); // Used for password hashing
const jwt = require("jsonwebtoken"); // Importing jwt
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const { OAuth2Client } = require("google-auth-library");


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
      user: {
        id: newuser._id,
        fname: newuser.fname,
        lastname: newuser.lastname,
        email: newuser.email,
        role: newuser.role,
      },
    });
  } catch (error) {
    console.error(error);
    // Unique index on email: two requests raced past the check above
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email is already in use" });
    }
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

    // Accounts created through Google have no password until they set one
    if (!user.password) {
      return res.status(400).json({
        error: "This account was created with Google. Please continue with Google.",
      });
    }

    const result = await bcrypt.compare(password, user.password); // Await the result of bcrypt.compare
    if (!result) {
      console.log(result); // If passwords do not match
      return res.status(401).json({ error: "Password is incorrect" });
    }

    // If user is found and passwords match
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      secretKey,
      { expiresIn: "7d" }
    );
    console.log("Generated Token:", token);
    return res.status(200).json({message:"login successful",token:token}); // Sending the token in the JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

// Google gives us a single display name; the User schema needs a first and last name.
const splitGoogleName = (payload) => {
  const given = (payload.given_name || "").trim();
  const family = (payload.family_name || "").trim();

  if (given || family) {
    return {
      fname: given || family,
      lastname: family || "User",
    };
  }

  const fullName = (payload.name || "").trim();
  if (!fullName) {
    return { fname: "Google", lastname: "User" };
  }

  const [fname, ...rest] = fullName.split(/\s+/);
  return {
    fname,
    lastname: rest.join(" ") || "User",
  };
};

const googleLogin = async (req, res) => {
  try {
    // 1. Receive Google ID token from frontend
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: "Google credential is required" });
    }

    // 2. Verify Google's ID token (signature, audience and expiry)
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // 3. Extract verified user information
    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ error: "Invalid Google token" });
    }

    const { sub: googleId, email, email_verified } = payload;

    if (!email || !email_verified) {
      return res.status(401).json({ error: "Google email is not verified" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 4. Find an existing account: prefer the email index, then the Google id
    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      user = await User.findOne({ googleId });
    }

    if (!user) {
      // 5. First Google login: create the account. No password is stored.
      const { fname, lastname } = splitGoogleName(payload);

      try {
        user = await User.create({
          fname,
          lastname,
          email: normalizedEmail,
          googleId,
        });
      } catch (error) {
        // Two parallel logins can both try to create the same account.
        if (error.code === 11000) {
          user = await User.findOne({ email: normalizedEmail });
        } else {
          throw error;
        }
      }
    } else if (!user.googleId) {
      // 6. Existing email/password account: link the Google identity to it
      user.googleId = googleId;
      await user.save();
    } else if (user.googleId !== googleId) {
      return res.status(401).json({ error: "Google account does not match this user" });
    }

    if (!user) {
      return res.status(500).json({ error: "Could not complete Google login" });
    }

    // 7. Issue the same app JWT as the normal login
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      secretKey,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "login successful",
      token,
      user: {
        id: user._id,
        fname: user.fname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(401).json({ error: "Google authentication failed" });
  }
};

module.exports = { createUser, finduser, googleLogin };

require("dotenv").config();

const transporter = require("./config/email");

const sendTestEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "vincentrkumar98@gmail.com",
      subject: "Testing Nodemailer",
      text: "Hello! My Node.js application successfully sent an email using Nodemailer.please start studying bro it is high time now",
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

sendTestEmail();
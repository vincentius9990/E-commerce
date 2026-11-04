const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/userschema");
const transporter = require("../config/email");

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // 1. Find the user by email
        const user = await User.findOne({ email });

        // 2. Don't reveal whether the account exists
        if (!user) {
            return res.status(200).json({
                message: "If the account exists, a reset email will be sent."
            });
        }

        // 3. Generate a secure random token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // 4. Hash the token before saving it
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // 5. Save the hashed token and expiry in MongoDB
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

        await user.save();

        // 6. Create the frontend reset URL
        const resetURL =
            `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // 7. Send the email using Nodemailer
        try {
            await transporter.sendMail({
                from: process.env.GMAIL_USER,
                to: user.email,
                subject: "Password Reset Request",
                html: `
                    <h2>Password Reset</h2>
                    <p>You requested a password reset.</p>
                    <a href="${resetURL}">Reset Your Password</a>
                    <p>This link expires in 15 minutes.</p>
                `
            });
        } catch (emailError) {
            // Clear the token if email delivery fails
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            await user.save();

            throw emailError;
        }

        return res.status(200).json({
            message: "If the account exists, a reset email will be sent."
        });

    } catch (error) {
        console.error("Forgot password error:", error);

        return res.status(500).json({
            message: "Unable to process your request."
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!token) {
            return res.status(400).json({
                message: "Password reset token is required."
            });
        }

        if (!password || password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long."
            });
        }

        // Hash the token from the URL to compare with the stored hash
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Find a user whose token matches and has not expired
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                message: "This reset link is invalid or has expired."
            });
        }

        // Update the password and clear the reset token
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        return res.status(200).json({
            message: "Password reset successful."
        });

    } catch (error) {
        console.error("Reset password error:", error);

        return res.status(500).json({
            message: "Unable to reset your password."
        });
    }
};

module.exports = { forgotPassword, resetPassword };
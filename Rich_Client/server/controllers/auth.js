const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerSchema, loginSchema } = require("../validation/schemas");
const nodemailer = require("nodemailer");
const transporter = require("../config/email");

const register = async (req, res) => {
  try {
    // Validate input
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create verification token
    const verificationToken = jwt.sign(
      { email: req.body.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Create user
    const user = new User({
      ...req.body,
      password: hashedPassword,
      verificationToken,
    });

    await user.save();

    // Send verification email
    const verificationUrl = `http://localhost:4567/auth/verify/${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Please verify your email",
      html: `
        <h1>Email Verification</h1>
        <p>Please click the link below to verify your email:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Please verify your email first" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Make sure to send both token and user data
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyToken = async (req, res) => {
  try {
    console.log("Verifying token for user:", req.user);
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      throw new Error("User not found");
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Please authenticate" });
  }
};

const createAdmin = async (req, res) => {
  try {
    // Check if the requester is an admin
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can create other admins" });
    }

    // Validate input
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create verification token
    const verificationToken = jwt.sign(
      { email: req.body.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Create user with admin role
    const user = new User({
      ...req.body,
      password: hashedPassword,
      verificationToken,
      role: "admin",
      isVerified: true, // Auto-verify admin accounts
    });

    await user.save();

    res.status(201).json({
      message: "Admin user created successfully",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Admin creation error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  verifyToken,
  createAdmin,
};

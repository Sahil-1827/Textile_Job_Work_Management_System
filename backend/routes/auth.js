const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP: Create Admin or User
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Hash the password (using bcrypt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// LOGIN: Authenticate and return Role
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Receive email

  try {
    // Find user by email instead of username
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );

    res.json({
      token,
      user: { username: user.username, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
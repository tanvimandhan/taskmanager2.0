const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
// 
// node server.js


const router = express.Router();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// POST /api/auth/register
router.post("/register", async (req, res) => {
    console.log(3)
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password });
    console.log("New user created:", newUser);

    await newUser.save();
    const token = generateToken(newUser);
    //localStorage.setItem("token", token);
    res.status(201).json({ token, user: { id: newUser._id, email, name, role: newUser.role } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
    console.log(3)
  const { email, password } = req.body;
  console.log(email)
  try {
    console.log(2)
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    console.log(token)
    //localStorage.setItem("token", token);
    res.status(200).json({ token, user: { id: user._id, email, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/auth/me
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;

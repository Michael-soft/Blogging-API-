const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
require("dotenv").config();



// User Signup
exports.signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create a new user (schema will handle the hashing)
    const newUser = await User.create({ first_name, last_name, email, password });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// User Signin
exports.login = async (req, res) => {  const { email, password } = req.body;
 const trimmedPassword = password.trim(); // Trim the incoming password
  try {
   // Find user by email
   const user = await User.findOne({ email });
   if (!user) {
     return res.status(404).json({ message: "User not found" });
   }
    
    // Check password // Log the test hashed password
   const isMatch = await bcrypt.compare(trimmedPassword, user.password); // Compare trimmed password
   console.log("Password Match Result:", isMatch); // Log the result of the comparison
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate JWT token
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
   res.status(200).json({ message: "Login successful", token });
 } catch (error) {
   res.status(500).json({ message: "Server error", error });
 }
};
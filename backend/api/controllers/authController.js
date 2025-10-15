const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// --- Validation Schemas ---

// Schema for user registration
const registerSchema = Joi.object({
  username: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

// Schema for user login
const loginSchema = Joi.object({
  username: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});


// --- Controller Functions ---

const registerUser = async (req, res) => {
  try {
    // 1. Validate the incoming request body
    const { username, password } = await registerSchema.validateAsync(req.body);

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create a new user instance and save to the database
    const newUser = new User({
      username, // username is already lowercased by Joi
      password: hashedPassword,
    });
    
    await newUser.save();

    res.status(201).json({ message: 'User created successfully. Please log in.' });

  } catch (error) {
    // Handle validation errors from Joi
    if (error.isJoi) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // Handle duplicate username error from MongoDB (error code 11000)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }
    // Handle any other server errors
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'An unexpected error occurred during registration.' });
  }
};


const loginUser = async (req, res) => {
  try {
    // 1. Validate the incoming request body
    const { username, password } = await loginSchema.validateAsync(req.body);

    // 2. Find the user in the database
    const user = await User.findOne({ username }); // username is already lowercased by Joi

    // 3. Check if user exists
    if (!user) {
      // Use a generic error message for security (don't reveal if username exists)
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // 4. Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // 5. Create JWT payload (including the user's unique ID)
    const payload = {
      id: user._id,
      username: user.username,
    };

    // 6. Sign the token
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login successful!',
      accessToken: accessToken,
    });

  } catch (error) {
    // Handle validation errors from Joi
    if (error.isJoi) {
        return res.status(400).json({ message: error.details[0].message });
    }
    // Handle any other server errors
    console.error('Login Error:', error);
    res.status(500).json({ message: 'An unexpected error occurred during login.' });
  }
};

module.exports = { registerUser, loginUser };
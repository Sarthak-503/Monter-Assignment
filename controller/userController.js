const User = require("../Models/userModel");
const bcrypt = require('bcryptjs');
const sendOTP = require('../utils/sendMail');

// Register A User

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    
    // Generate OTP (you can use any OTP generation library)
    const otp = generateOTP();
    
    // Send OTP to user's email
    await sendOTP(email, otp);
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      email,
      password: hashedPassword,
      otp
    });

    // Save user to the database
    await user.save();
    res.json({ msg: 'OTP sent to email for verification' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ msg: 'Invalid OTP' });
    }

    // Mark user as verified
    user.verified = true;
    await user.save();

    res.json({ msg: 'Account verified successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addUserInfo = async (req, res) => {
  try {
    const { email, location, age, workDetails } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    // Update user information
    user.location = location;
    user.age = age;
    user.workDetails = workDetails;
    await user.save();

    res.json({ msg: 'User information added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

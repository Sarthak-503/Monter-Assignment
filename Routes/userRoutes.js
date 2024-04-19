const express = require('express');
const router = express.Router();
const {registerUser} = require("../controller/userController");
const {verifyOTP} = require("../controller/userController");
const {addUserInfo} = require("../controller/userController");
const User = require('../Models/userModel');

router.route("/register").post(registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/add-info', addUserInfo);

// router.post('/register', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Checks if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//     user = new User({
//       email,
//       password: hashedPassword,
//     });

//     // Save user to the database
//     await user.save();

//     res.json({ msg: 'User registered successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;

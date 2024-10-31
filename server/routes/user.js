const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Models
const User = require('../models/user');

/*                                                  ROUTES                                                  */

// @route   POST /api/user
// @desc    Register a new user
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    // User already registered
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already registered!'
      });
    }

    // Create New User
    user = new User(req.body);

    // Encrypting the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save to database
    await user.save();

    // Payload for jwt
    const payload = {
      user: {
        id: user._id
      }
    };

    // Signing the payload
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;

        // Do not send this to the client
        user.password = undefined;

        return res.json({
          success: true,
          token,
          user
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

module.exports = router;

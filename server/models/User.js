const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true
    },

    email: {
      type: String,
      required: [true, 'Please add a valid email'],
      trim: true,
      unique: true
    },

    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6
    },

    summary: {
      type: String,
      required: true
    },

    skills: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);

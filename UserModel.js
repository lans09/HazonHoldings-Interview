const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: [true,'please provide an Email'],
    trim : true
  },
  password: {
    type: String,
    required: [true,'please provide a password']
  },
  });

  
module.exports = mongoose.model('User', userSchema);

// models/devusermodel.js
const mongoose = require('mongoose');

const devuser = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  skill: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmpassword: {
    type: String
  }
});

module.exports = mongoose.model('devuser', devuser);

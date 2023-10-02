// userModel.js
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String
    
  },
  emailid: {
    type: String,
    required: true,
    unique: true, // Ensure email addresses are unique
  },
  password: {
    type: String,
    required: true,
  },
  profile:{
    type:String,
    required:false
  },
  deploymentOption:{
    type:String,
    required:false
  }
});

// Create and export the User model
const UserProfile = mongoose.model('User', userSchema);

module.exports = UserProfile;

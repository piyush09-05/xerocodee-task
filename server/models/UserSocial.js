const mongoose = require('mongoose');

// Define the SocialUser schema
const userSocial = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  serialString: {
    type: String, // Change the type to ObjectId
    required: true,
  },
});

// Create the SocialUser model
const UserSocial = mongoose.model('UserSocial', userSocial);

module.exports = UserSocial;


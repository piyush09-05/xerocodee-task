

const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/UserProfile.js') 
const db = require('../util/db.js'); 

Router.post('/sign-up', async (req, res) => {

  console.log(req.body);
    
  try {

    const { firstname, lastname, emailid, password } = req.body;
    
  
    const existingUser = await User.findOne({ emailid });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({
      firstname,
      lastname,
      emailid,
      password: hashedPassword,
      profile:"",
      deploymentOption:""
    });


    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(`Error during user registration: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

Router.post('/log-in' ,async (req, res) => {
      // Check for validation errors
     
  
      const { emailid, password } = req.body;

  
      try {
        // Find the user by email
        const user = await User.findOne({ emailid });
  
        if (!user) {
          return res.status(401).json({ message: 'User not found.' });
        }
  
        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
  
        // Generate and send a JWT token upon successful authentication
        const token = jwt.sign({ userId: user._id }, 'my-secret-key', {
          expiresIn: '1h', // Set the token expiration time (e.g., 1 hour)
        });
  
        res.status(200).json({ message: 'Login successful', token });
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  );

  Router.post('/add-role', async (req, res) => {
    const { emailid, profile } = req.body;
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { emailid },
        { $set: { profile } },
        { new: true }
      );
  
      if (updatedUser) {
        console.log(updatedUser);
        res.status(201).json(updatedUser);
      } else {
        res.status(404).json({ msg: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });

  Router.post('/add-deployment', async (req, res) => {
    const { emailid, deploymentOption } = req.body;
  
    try {
      // Find the user by emailid
      const user = await User.findOne({ emailid });
  
      if (user) {
        // Update the user's deploymentOption
        user.deploymentOption = deploymentOption;
        
        // Save the updated user
        const updatedUser = await user.save();
        
        res.status(201).json(updatedUser);
      } else {
        res.status(404).json({ msg: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // api key = AIzaSyCnvy1nUtcMCk5KAaskDiSTtDAAOvYc0pM

  // client id = 716711964050-5trqhpdek110p93dfj08588gpmqr1570.apps.googleusercontent.com

  //client secret = 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

module.exports = Router;



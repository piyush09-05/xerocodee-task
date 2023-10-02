// db.js
const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURI = 'mongodb+srv://piyush09:962drniXem9N4LtJ@cluster0.1bqc8.mongodb.net/?retryWrites=true&w=majority'; // Replace with your database URL

// Connect to MongoDB  //962drniXem9N4LtJ
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Handle connection events
db.on('connected', () => {
  console.log('Connected to MongoDB');
});  

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Export the Mongoose connection
module.exports = db;

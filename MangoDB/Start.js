const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Load environment variables from .env file
require("dotenv").config();

// Database connection URL from the .env file
let url = process.env.MangoUrl + "/Atest";
console.log("Connecting to:", url);

// Connect to MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Define the Contact schema and model
const ContactSchema = new mongoose.Schema({
  email: String,
  query: String
});

const Contact = mongoose.model("Contact", ContactSchema);

// Initialize Express app
const app = express();

// Middleware for parsing form data
app.use(bodyParser.urlencoded({
  extended: true
}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the contact.html file
app.get("/contact", function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Handle form submission
app.post("/contact", function (req, res) {
  console.log("Received form data:", req.body);

  // Create a new Contact entry
  const contact = new Contact({
    email: req.body.email,
    query: req.body.query
  });

  // Save to the database
  contact.save(function (err) {
    if (err) {
      console.error("Error saving contact form data:", err);
      res.status(500).send("An error occurred while submitting your query.");
    } else {
      console.log("Contact form data saved successfully");
      res.sendFile(path.join(__dirname, 'public', 'contact.html'));
    }
  });
});

// Start the server on port 3000
app.listen(3000, function () {
  console.log("App is running on Port 3000");
});

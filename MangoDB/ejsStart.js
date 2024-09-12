const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Load environment variables from .env file
require("dotenv").config();

// Database connection URL from the .env file
let url = process.env.MangoUrl;
console.log("Connecting to:", url);

// Connect to MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Define the Contact schema and model
const ContactSchema = new mongoose.Schema({
  email: String,
  query: String
});

const Contact = mongoose.model("Contact", ContactSchema);

// Initialize Express app
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware for parsing form data
app.use(bodyParser.urlencoded({
  extended: true
}));

// Serve static files from the public directory if needed
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the contact.ejs page
app.get("/contact", function (req, res) {
  res.render("contact");
});

// Handle form submission
app.post("/contact", async function (req, res) {
    try {
      console.log("Received form data:", req.body);
  
      // Create a new Contact entry
      const contact = new Contact({
        email: req.body.email,
        query: req.body.query
      });
  
      // Save to the database (using await)
      await contact.save();
  
      console.log("Contact form data saved successfully");
      res.render("contact", { message: "Your query has been submitted!" });
  
    } catch (err) {
      console.error("Error saving contact form data:", err);
      res.status(500).render("contact", { message: "An error occurred while submitting your query." });
    }
  });
// Start the server on port 3000
app.listen(3000, function () {
  console.log("App is running on Port 3000");
});

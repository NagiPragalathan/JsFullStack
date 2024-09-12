const mongoose = require("mongoose");
const { Schema } = mongoose;
const express = require("express")

require("dotenv").config()

mongoose.connect(process.env.MangoUrl, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});
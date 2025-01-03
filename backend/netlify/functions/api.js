const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const yahooRoutes = require('../../src/routes/yahoo');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/.netlify/functions/api/yahoo', yahooRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Export handler for serverless
exports.handler = serverless(app); 
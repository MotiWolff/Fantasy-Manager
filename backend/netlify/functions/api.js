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

// Add this route before exports.handler
app.get('/.netlify/functions/api/test-db', async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    res.json({ 
      message: 'Database connection successful',
      timestamp: new Date(),
      status: 'connected'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Database connection failed', 
      details: error.message 
    });
  }
});

// Export handler for serverless
exports.handler = serverless(app); 
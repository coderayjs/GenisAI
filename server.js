const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Debug logging
app.use((req, res, next) => {
  console.log('Request received:', {
    method: req.method,
    url: req.url,
    body: req.body,
    headers: req.headers
  });
  next();
});

// Root route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Telegram verification route - EXACT PATH MATCH
app.post('/api/verify-telegram-follow', (req, res) => {
  // Log the incoming request
  console.log('Telegram verification request:', req.body);
  
  // Always return success for testing
  res.json({
    isFollowing: true,
    username: req.body.username,
    status: 'success'
  });
});

// 404 handler
app.use((req, res) => {
  console.log('404 for:', req.method, req.url);
  res.status(404).json({
    error: 'Not Found',
    path: req.url
  });
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Available routes:');
  console.log('GET /');
  console.log('POST /api/verify-telegram-follow');
}); 
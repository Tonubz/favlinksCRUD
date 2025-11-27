
// server/index.js
const express = require('express');
const path = require('path');
const app = express();
const db = require('./queries');

const PORT = 9001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve React build
app.use(express.static(path.resolve(__dirname, '../client/build')));

// API routes
app.get('/links', db.getLinks);          // READ all
app.post('/new', db.createLink);         // CREATE (kept as /new to match your current code)
app.put('/links/:id', db.updateLink);    // UPDATE
app.delete('/links/:id', db.deleteLink); // DELETE

// React SPA fallback
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}.`);
});

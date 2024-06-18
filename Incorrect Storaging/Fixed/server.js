// server.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const sanitizeFilename = require('sanitize-filename'); // for sanitizing file names

const app = express();
const port = 3000;

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Sanitize the file name to prevent directory traversal and other attacks
    const sanitizedFilename = sanitizeFilename(file.originalname);
    cb(null, Date.now() + '-' + sanitizedFilename);
  }
});

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MB file size limit
  },
  fileFilter: function (req, file, cb) {
    // Validate file types
    const allowedMimes = ['image/jpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG images are allowed.'));
    }
  }
});

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('uploadedFile'), (req, res) => {
  // Multer middleware has processed the file upload
  if (!req.file) {
    return res.status(400).send('Please select a file to upload.');
  }
  
  // Process the uploaded file securely (e.g., store it in a database, manipulate it, etc.)
  // For demonstration, we'll just send a success response
  res.send('File uploaded successfully.');
});

// Error handling middleware for Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error (e.g., file size limit exceeded)
    res.status(400).send('File upload error: ' + err.message);
  } else {
    // Other errors
    res.status(500).send('Internal server error: ' + err.message);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('uploadedFile'), (req, res) => {
  // Incorrect handling - assume the file is just stored in 'uploads/' directory
  res.send('File uploaded successfully.');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

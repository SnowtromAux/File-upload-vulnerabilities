const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination directory for uploaded files
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Generate a unique suffix based on the current timestamp and a random number
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        // Sanitize the original filename to avoid path traversal issues
        const sanitizedFilename = path.basename(file.originalname);

        // Combine the unique suffix with the sanitized filename
        // This prevents filename collisions and ensures that each file has a unique name
        cb(null, uniqueSuffix + '-' + sanitizedFilename);
    }
});


const upload = multer({ storage: storage });

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).send('File uploaded successfully!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

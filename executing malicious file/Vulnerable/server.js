const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(fileUpload());

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let uploadedFile = req.files.file;

    // Save the file to a directory without validating its contents
    let uploadPath = path.join(__dirname, 'uploads', uploadedFile.name);

    uploadedFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        // Simulate execution of the uploaded file (unsafe operation)
        if (path.extname(uploadedFile.name) === '.js') {
            try {
                // Dangerous: executing the uploaded JavaScript file
                require(uploadPath);
            } catch (error) {
                console.error('Error executing uploaded script:', error);
            }
        }

        res.send('File uploaded!');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());


let requestCount = 0;

app.get('/', (req, res) => {
    requestCount++;
    res.send(`Files Uploaded: ${requestCount}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

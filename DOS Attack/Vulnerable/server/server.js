const express = require('express');
const app = express();
const PORT = 3000;

let requestCount = 0;

app.get('/', (req, res) => {
    requestCount++;
    res.send(`Request count: ${requestCount}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

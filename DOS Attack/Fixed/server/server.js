const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = 3000;

let requestCount = 0;

// Enable CORS for all routes
app.use(cors());

// Apply rate limiting to all requests
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

app.get('/', (req, res) => {
    requestCount++;
    res.send(`Request count: ${requestCount}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

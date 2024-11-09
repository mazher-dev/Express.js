const express = require('express');
const app = express();
const port = 3000;

// Utility function to create errors
function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

// Routes
app.get('/cause-error', (req, res, next) => {
    next(createError(500, "Simulated server error"));
});

app.get('/bad-request', (req, res, next) => {
    next(createError(400, "Bad Request"));
});

app.get('/async-error', async (req, res, next) => {
    try {
        throw new Error("Async error occurred!");
    } catch (error) {
        next(error);
    }
});

// 404 Handler for unknown routes
app.use((req, res, next) => {
    next(createError(404, "Not Found"));
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});

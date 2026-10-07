const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware to parse JSON requests
app.use(express.json());

// Apply Custom Logger Middleware globally[cite: 1, 2]
app.use(logger);

// Base route
app.get('/', (req, res) => {
    res.send('Welcome to the Student Management REST API');
});

// Use Modular Routing for all /students endpoints[cite: 1, 2]
app.use('/students', studentRoutes);

// Catch-all middleware for 404 Not Found (Invalid routes)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint Not Found' });
});

// Start Express Server[cite: 1, 2]
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
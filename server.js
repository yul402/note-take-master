// Import data
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');

// Create an express server
const app = express();
// Set PORT
const PORT = process.env.PORT || 3001;

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);

// This has to be on the top than the other routers
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
    console.log(`${path.join(__dirname, './public/index.html')}`)
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// If no matching route is found default to home page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Listener
app.listen(PORT, () => {
    console.log(`API server is ready on port ${PORT}!`);
});
// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const analyzeText = require('./sentiment/analyze');
const chatbot = require('./chatbot');
const getArticles = require('./articles');

// Create Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the views directory
app.use(express.static(path.join(__dirname, '../Public')));

// Sentiment Analysis Route
app.post('/analyze', (req, res) => {
    const text = req.body.text;
    const result = analyzeText(text);
    res.json(result);
});

// Chatbot Route
app.post('/chatbot', (req, res) => {
    const text = req.body.text;
    const response = chatbot(text);
    res.json({ response });
});

// Articles Route
app.get('/articles', (req, res) => {
    const topic = req.query.topic;
    const articles = getArticles(topic);
    res.json(articles);
});

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/index.html'));
});
app.get('/article.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/article.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
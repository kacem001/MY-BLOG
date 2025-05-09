const Sentiment = require('sentiment');
const sentiment = new Sentiment();

module.exports = function analyzeText(text) {
    if (!text || text.trim() === '') {
        return {
            sentiment: 'empty',
            emoji: '⚠️',
            score: 0,
            message: 'Please enter some text to analyze.'
        };
    }

    // Analyze the text using the sentiment library
    const result = sentiment.analyze(text);

    // Round the score to make it cleaner
    const roundedScore = Math.round(result.score);

    console.log('Raw sentiment result:', result);
    console.log('Calculated score:', roundedScore);

    // Determine sentiment based on score
    if (result.score > 0) {
        return {
            sentiment: 'positive',
            emoji: '😊',
            score: roundedScore,
            message: `Your text has a positive sentiment!`
        };
    } else if (result.score < 0) {
        return {
            sentiment: 'negative',
            emoji: '😠',
            score: roundedScore,
            message: `Your text has a negative sentiment.`
        };
    } else {
        return {
            sentiment: 'neutral',
            emoji: '😐',
            score: roundedScore,
            message: `Your text has a neutral sentiment.`
        };
    }
};
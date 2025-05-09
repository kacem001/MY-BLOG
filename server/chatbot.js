module.exports = function chatbot(text) {
    // Simple response logic for various keywords and phrases
    const responses = {
        hello: 'Hello! How can I assist you today?',
        hi: 'Hi there! How can I help you?',
        hey: 'Hey! What can I do for you?',
        how: 'I am doing well, thank you for asking! How can I help you?',
        name: 'I am a chatbot. What is your name?',
        help: 'I am here to assist you. How can I help?',
        goodbye: 'Goodbye! Have a great day!',
        thanks: 'You\'re welcome! Let me know if you need anything else.',
        sorry: 'No problem! Let me know if you need further assistance.',
        bye: 'Bye! Take care!',
        "how are you": 'I am just a bot, but I\'m doing great, thank you for asking!',
        "what is your name": 'I am a chatbot, I don\'t have a personal name, but I\'m here to assist you!',
        "who are you": 'I am a chatbot, here to help you with your inquiries.',
        "can you help me": 'Yes, I can help you with many things. How can I assist you?',
        "good morning": 'Good morning! How can I assist you today?',
        "good night": 'Good night! Sleep well!',
        "tell me a joke": 'Why dont skeletons fight each other? They dont have the guts!',
        "what is the weather": 'I don\'t know the current weather, but I can help you find it online.',
        "what is the time": 'I can\'t tell the time, but you can check your device.',
        "where are you from": 'I am from the cloud, powered by technology!',
        "i need help": 'I\'m here to help! What do you need assistance with?',
        "thank you": 'You\'re welcome! I\'m happy to help.',
        "you are welcome": 'Thank you for your kind words!',
        "how do you do": 'I\'m doing well! How can I assist you today?',
        "what can you do": 'I can chat, assist with information, and answer questions.',
        "tell me something interesting": 'Did you know that honey never spoils? Archaeologists have found pots of honey in ancient tombs that are over 3000 years old!',
        "how do i reset my password": 'You can reset your password by following the instructions on the reset page of the website.',
        "can you answer my questions": 'Yes, I am here to answer your questions to the best of my ability.',
        "do you know any facts": 'Did you know that octopuses have three hearts? Two pump blood to the gills, while one pumps it to the rest of the body.',
        "help me please": 'I am here to help! What do you need assistance with?',
        "what is your favorite color": 'I don\'t have a favorite color, but I like all colors!',
        "do you like music": 'I can\'t hear music, but I can help you find music recommendations!',
        "tell me a story": 'Once upon a time, there was a chatbot who loved to help people.',
        "who made you": 'I was created by developers using AI technology.',
        "how does a chatbot work": 'A chatbot works by processing input text and providing relevant responses based on pre-programmed logic.',
        "what is ai": 'AI stands for Artificial Intelligence. It refers to the simulation of human intelligence in machines.',
        "how old are you": 'I dont age, Im just a bot created to assist you.',
        "what is programming": 'Programming is the process of writing instructions that a computer can follow to perform specific tasks.',
        "can you translate": 'Yes, I can help translate text between languages!',
        "do you speak french": 'Oui, je parle français!',
        "can you speak arabic": 'نعم، أستطيع التحدث بالعربية!',
        "what do you know": 'I know a lot about various topics like programming, general knowledge, jokes, and more!',
        "what is the capital of france": 'The capital of France is Paris.',
        "what is 2 plus 2": '2 plus 2 is 4.',
        "how to make a cake": 'To make a cake, you need ingredients like flour, sugar, eggs, and butter. Would you like a specific recipe?',
        "how do i fix my computer": 'You can start by restarting your computer or checking for updates. If the problem persists, consider reaching out to a tech expert.',
        "what is blockchain": 'Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack, or cheat the system.',
        "what is a website": 'A website is a collection of web pages that are accessed through the internet.',
        "what is the internet": 'The internet is a global network of computers that allows information and data to be exchanged.'
    };

    const normalizedText = text.toLowerCase(); // Normalize the input to lowercase

    // Create lowercase versions of all keywords for matching
    const lowercaseKeywords = {};
    for (let keyword in responses) {
        lowercaseKeywords[keyword.toLowerCase()] = responses[keyword];
    }

    // Check if any lowercase keyword is in the normalized input text
    for (let keyword in lowercaseKeywords) {
        if (normalizedText.includes(keyword)) {
            return lowercaseKeywords[keyword];
        }
    }

    return "I'm sorry, I don't know that.";
};
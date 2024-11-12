const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config(); // Ensure this is at the top before importing any other files or operations that use environment variables

// Connect DB
require('./config/dbConnection');
// Connect to MongoDB

// Middlewares
const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { registerUser, loginUser } = require('./controllers/authController');
const { createConversation, getConversations } = require('./controllers/conversationController');
const { createMessage, getMessages } = require('./controllers/messageController');
const { getAllUsers } = require('./controllers/userController');
const PORT = process.env.PORT || 5000;
// Routes
app.get('/', (req, res) => {
    res.send('Welcome');
})
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);
app.post('/api/conversation', createConversation);
app.get('/api/conversation/:userId', getConversations);
app.post('/api/message', createMessage);
app.get('/api/message/:conversationId', getMessages);
app.get('/api/users', getAllUsers);
app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});
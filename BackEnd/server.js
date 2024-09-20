const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const socketHandler = require('./routes/socket');

dotenv.config();
const app = express();
const server = http.createServer(app);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.use(express.json());

// Routes
app.use('./api/auth', authRoutes);

// Socket.IO
socketHandler(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server running at port ${PORT}`));
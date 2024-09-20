const socketIO = require('sokect.io');
const Message = require('../models/Message');

const socketHandler = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket)=>{
        console.log('New client connected');

        // Join chat room
        socket.on('joinRoom',({ roomId })=>{
            socket.join(roomId);
        });

        // Handle sending messages
        socket.on('chatMessage', async({ roomId, senderId, message })=> {
            const newMessage = await Message.create({ chatRoomId: roomId, sender: senderId, message});
            io.to(roomId).emit('message',newMessage);
        });

        //Handle disconnect
        socket.on('disconnect', ()=> {
            console.log('Client disconnected');
        });
    });
};

module.exports = socketHandler;
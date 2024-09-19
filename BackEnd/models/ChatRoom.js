const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    name: { type: String, required: true},
    isGroupChat: { type: Boolean, default: false},
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
module.exports = ChatRoom;
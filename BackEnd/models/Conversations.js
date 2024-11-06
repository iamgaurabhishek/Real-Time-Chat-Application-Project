const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
        members: {
            type: Array,
            required: true,
        },
        // In the above Array of members we will store the id of the logged in user and the id of the person with whom the user is having conversations.
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
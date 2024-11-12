const Messages = require('../models/Messages');
const Conversations = require('../models/Conversations');
const Users = require('../models/Users');

exports.createMessage = async (req, res) => {
    try {
        const { conversationId, senderId, message, receiverId = '' } = req.body;
        // if the user does not have a conversation with any particular user then here we will check the conditions and create a new converstation object with the conversation.id so we can have the messages data between the two users. Here we can create a new conversation because we are handling the 'post' request.
        if(!senderId || !message) {
            return res.status(400).send('Please fill all required fields');
        }
        if(!conversationId && receiverId){
            // Now here the time to create the new conversations
            const newConversation = new Conversations({ members: [senderId, receiverId]});
            await newConversation.save();
            const newMessage = new Messages({ conversationId: newConversation._id, senderId, message});
            await newMessage.save();
            return res.status(200).send('Message sent successfully');
        }
        else if(!conversationId && !receiverId){
            return res.status(400).send('Please fill all required fields');
        }
        const newMessage = new Messages({ conversationId, senderId, message });
        await newMessage.save();
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.log('Error: ', error)
    }
};

exports.getMessages = async (req, res) => {
    try {
        const conversationId = req.params.conversationId;
        // Here it will check the conversation Id for the proposal of the new conversation, but we can not create any new conversation here because here we are handling the 'get' request.
        if(!conversationId){
            return res.status(200).json([]);
        }
        const messages = await Messages.find({ conversationId });
        const messageUserData = Promise.all(messages.map(async (message) => {
            const user = await Users.findById(message.senderId);
            return { user: { email: user.email, fullName: user.fullName }, message: message.message }
        }))
        res.status(200).json(await messageUserData);
    } catch (error) {
        console.log("Error: ", error);
    }
};


// app.post('/api/message', async(req, res) => {
//     try {
//         const { conversationId, senderId, message, receiverId = '' } = req.body;
//         // if the user does not have a conversation with any particular user then here we will check the conditions and create a new converstation object with the conversation.id so we can have the messages data between the two users. Here we can create a new conversation because we are handling the 'post' request.
//         if(!senderId || !message) {
//             return res.status(400).send('Please fill all required fields');
//         }
//         if(!conversationId && receiverId){
//             // Now here the time to create the new conversations
//             const newConversation = new Conversations({ members: [senderId, receiverId]});
//             await newConversation.save();
//             const newMessage = new Messages({ conversationId: newConversation._id, senderId, message});
//             await newMessage.save();
//             return res.status(200).send('Message sent successfully');
//         }
//         else if(!conversationId && !receiverId){
//             return res.status(400).send('Please fill all required fields');
//         }
//         const newMessage = new Messages({ conversationId, senderId, message });
//         await newMessage.save();
//         res.status(200).send('Message sent successfully');
//     } catch (error) {
//         console.log('Error: ', error)
//     }
// })

// app.get('/api/message/:conversationId', async (req, res) => {
//     try {
//         const conversationId = req.params.conversationId;
//         // Here it will check the conversation Id for the proposal of the new conversation, but we can not create any new conversation here because here we are handling the 'get' request.
//         if(!conversationId){
//             return res.status(200).json([]);
//         }
//         const messages = await Messages.find({ conversationId });
//         const messageUserData = Promise.all(messages.map(async (message) => {
//             const user = await Users.findById(message.senderId);
//             return { user: { email: user.email, fullName: user.fullName }, message: message.message }
//         }))
//         res.status(200).json(await messageUserData);
//     } catch (error) {
//         console.log("Error: ", error);
//     }
// })

/* When using "async/await" inside a map function, it's necessary to wrap the "map" function in "Promise.all" because "map" function in "Promise.all" because "map" itself does not handle asynchronous behaviour.

1. Array.map is not await-Aware

2. Using Promise.all to resolve all Promises

*/

/*
        Promise.all returns a Promise:
            so the corresponding contant value will be returned a promise,
            For example in the above case the usersData is therefore a promise that will eventually resolve to an array of objects containing fullName and email for each user.
        Why use await usersData:
            * By using await usersData, we wait for the Promise.all to resolve and retrieve the actual array of user data.

            * Without await, res.status(200).json(usersData); would send the response back as a pending promise rather than the resolved array.
 */
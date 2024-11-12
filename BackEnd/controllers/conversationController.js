const Conversations = require('../models/Conversations');
const Users = require('../models/Users');

// Here we have created a new conversation.
exports.createConversation = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const newConversation = new Conversations({ members: [senderId, receiverId] });
        await newConversation.save();
        res.status(200).send('Conversation created successfully');
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
};


// Now I want to show the data of the conversation.
exports.getConversations = async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversations.find({ members: { $in: [userId] } }); // $in means "include"
        // Next we want to show the data of the members who are involved in the conversation, for that look at the below code:

        // 1. --------New Concepts: whenever we are using async await function inside the map function, we need to provide it the Promise.all object.--------------------------------------------------------
        const conversationUserData = Promise.all(conversations.map( async (conversation) => {
            const receiverId = conversation.members.find((member) => member !== userId);
            const user = await Users.findById(receiverId);
            return { user: {email: user.email, fullName: user.fullName}, conversationId: conversation.id };
        }))
        console.log("Conversation User Data: ",await conversationUserData);
        res.status(200).json(await conversationUserData);
    } catch (error) {
        console.log('Error: ', error);
    }
};



// // Here we have created a new conversation.
// app.post('/api/conversation', async (req, res) => {
//     try {
//         const { senderId, receiverId } = req.body;
//         const newConversation = new Conversations({ members: [senderId, receiverId] });
//         await newConversation.save();
//         res.status(200).send('Conversation created successfully');
//     } catch (error) {
//         console.log("Error: ", error);
//     }
// })

// // Now I want to show the data of the conversation
// app.get('/api/conversation/:userId', async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const conversations = await Conversations.find({ members: { $in: [userId] } }); // $in means "include"
//         // Next we want to show the data of the members who are involved in the conversation, for that look at the below code:

//         // 1. --------New Concepts: whenever we are using async await function inside the map function, we need to provide it the Promise.all object.--------------------------------------------------------
//         const conversationUserData = Promise.all(conversations.map( async (conversation) => {
//             const receiverId = conversation.members.find((member) => member !== userId);
//             const user = await Users.findById(receiverId);
//             return { user: {email: user.email, fullName: user.fullName}, conversationId: conversation.id };
//         }))
//         console.log("Conversation User Data: ",await conversationUserData);
//         res.status(200).json(await conversationUserData);
//     } catch (error) {
//         console.log('Error: ', error)
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
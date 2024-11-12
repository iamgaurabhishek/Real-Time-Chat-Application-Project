const Users = require('../models/Users');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        const usersData = await Promise.all(users.map(async (user) => {
            return { fullName: user.fullName, email: user.email, userId: user._id };
        }));
        res.status(200).json(usersData);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
};

// app.get('/api/users', async(req, res) => {
//     try{
//         const users = await Users.find(); 
//         const usersData = Promise.all(users.map( async (user) => {
//             return { fullName: user.fullName, email: user.email, userId: user._id };
//         }))
//         res.status(200).json(await usersData);
//     }
//     catch(error){
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
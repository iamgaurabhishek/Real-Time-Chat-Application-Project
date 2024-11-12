const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');


// Whenever we are dealing with the database it will take some time to fetch the data from it so we can use the powers of asyncronous javascript
exports.registerUser = async (req, res, next) => {
    try{
        const { fullName, email, password } = req.body;

        if(!fullName || !email || !password){
            res.status(400).send('Please enter all required fields');
        }
        //Step 1: Now we will check whether the email already exists or not
        else{
            const isAlreadyExists = await Users.findOne({ email });
            if(isAlreadyExists) {
                res.status(400).send('User already exists');
            }else{
                //Step 2: we will not send the password here beacuse first we have to encrypt the password to make it more secure.
                const newUser = new Users({fullName, email});
                // Step 3. Now we will bcrypt the password to make it more secure.
                bcryptjs.hash(password, 10, (err, hashedPassword) => {
                    newUser.set('password', hashedPassword);
                    newUser.save();
                    next();
                })
                return res.status(200).send('User registered successfully');
            }
        }
    }
    catch(error){
        res.status(500).send('Server Error'. error);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if( !email || !password){
            res.status(400).send('Please enter all required fields');
        }
        else{
            const user = await Users.findOne({ email });
            if(!user){
                res.status(400).send('User email or password is incorrect');
            }else{
                const validateUser = await bcryptjs.compare(password, user.password);
                if(!validateUser){
                    res.status(400).send('User email or password is incorrect');
                } else{
                    const payload = {
                        userId: user._id,
                        email: user.email,
                    }
                    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'THIS_IS_PATIALA_HOUSE';
                    jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: 84600}, async(err, token) => {
                        await Users.updateOne({_id: user._id,}, {
                            $set:{token: token}   // {token} when the key and value pairs are same.
                        })
                        user.save();
                        next();
                    })
                    res.status(200).json({user:{email:user.email, fullName:user.fullName}, token:user.token});
                }
            }
        }
    } catch (error) {
        res.status(500).send('Server Error'. error);
    }
}

// // Whenever we are dealing with the database it will take some time to fetch the data from it so we can use the powers of asyncronous javascript
// app.post('/api/register', async(req, res, next) => {
//     try{
//         const { fullName, email, password } = req.body;

//         if(!fullName || !email || !password){
//             res.status(400).send('Please enter all required fields');
//         }
//         //Step 1: Now we will check whether the email already exists or not
//         else{
//             const isAlreadyExists = await Users.findOne({ email });
//             if(isAlreadyExists) {
//                 res.status(400).send('User already exists');
//             }else{
//                 //Step 2: we will not send the password here beacuse first we have to encrypt the password to make it more secure.
//                 const newUser = new Users({fullName, email});
//                 // Step 3. Now we will bcrypt the password to make it more secure.
//                 bcryptjs.hash(password, 10, (err, hashedPassword) => {
//                     newUser.set('password', hashedPassword);
//                     newUser.save();
//                     next();
//                 })
//                 return res.status(200).send('User registered successfully');
//             }
//         }
//     }
//     catch(error){
//         res.status(500).send('Server Error'. error);
//     }
// })

// app.post('/api/login', async (req, res, next) => {
//     try {
//         const { email, password } = req.body;

//         if( !email || !password){
//             res.status(400).send('Please enter all required fields');
//         }
//         else{
//             const user = await Users.findOne({ email });
//             if(!user){
//                 res.status(400).send('User email or password is incorrect');
//             }else{
//                 const validateUser = await bcryptjs.compare(password, user.password);
//                 if(!validateUser){
//                     res.status(400).send('User email or password is incorrect');
//                 } else{
//                     const payload = {
//                         userId: user._id,
//                         email: user.email,
//                     }
//                     const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'THIS_IS_PATIALA_HOUSE';
//                     jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: 84600}, async(err, token) => {
//                         await Users.updateOne({_id: user._id,}, {
//                             $set:{token: token}   // {token} when the key and value pairs are same.
//                         })
//                         user.save();
//                         next();
//                     })
//                     res.status(200).json({user:{email:user.email, fullName:user.fullName}, token:user.token});
//                 }
//             }
//         }
//     } catch (error) {
//         res.status(500).send('Server Error'. error);
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
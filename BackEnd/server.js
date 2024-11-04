const express = require('express');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load environment variables from .env file
dotenv.config(); // Ensure this is at the top before importing any other files or operations that use environment variables

// Connect DB
require('./config/dbConnection');

// Import files
const Users = require('./models/Users');

// Connect to MongoDB

// Middlewares
const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;
// Routes
app.get('/', (req, res) => {
    res.send('Welcome');
})

// Whenever we are dealing with the database it will take some time to fetch the data from it so we can use the powers of asyncronous javascript
app.post('/api/register', async(req, res, next) => {
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
})

app.post('/api/login', async (req, res, next) => {
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
})

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})
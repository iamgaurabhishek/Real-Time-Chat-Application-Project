const express = require('express');
const dotenv = require('dotenv');

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
app.post('api/register', async(req, res) => {
    try{
        const { fullName, email, password } = req.body;

        if(!fullName || !email || !password){
            res.status(400).send('Please enter all required fields');
        }
        // Now we will check whether the email already exists or not
        else{
            const isAlreadyExists = await Users.findOne({ email });
            if(isAlreadyExists) {
                res.status(400).send('User already exists');
            }else{
                // we will not send the password here beacuse first we have to encrypt the password to make it more secure.
                const newUser = new Users({fullName, email});
                
            }
        }
    }
    catch(error){
        res.status(500).send('Server Error');
    }
})

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})
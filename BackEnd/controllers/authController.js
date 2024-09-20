const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) =>{
    const { username, email, password } = req.body;

    try{
        const user = await User.create({ username, email, password });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 'id'});
        res.status(201).json({token, user});
    }
    catch(error){
        return res.status(400).json({ error: 'Registration failed' });
    }
};

exports.loginUser = async (req, res)=>{
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(user && (await user.matchPassword(password))){
            const token = jwt.sign( { id: user._id }, process.env.JWT_SECRET, { expiresIn: 'id'});
            res.json({token, user});
        }
        else{
            res.status(401).json({ error: 'Invalid email or password'});
        }
    }
    catch(error){
        response.status(400).json({error: 'Login failed'});
    }
};
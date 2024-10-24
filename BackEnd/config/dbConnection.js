const mongoose = require('mongoose');

const URL =process.env.MONGO_URI;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log('Connect to DB'))
  .catch((error)=> console.error('Error connecting to DB:', error));
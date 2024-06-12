require('dotenv').config();
const mongoose = require('mongoose');

const connectToMongoose = () =>{
    mongoose.connect(process.env.MONGO_URL);
}

module.exports = connectToMongoose;
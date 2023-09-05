const mongoose = require('mongoose');

const connectToMongoose = () =>{
    mongoose.connect('mongodb://127.0.0.1:27017/inotes');
}

module.exports = connectToMongoose;
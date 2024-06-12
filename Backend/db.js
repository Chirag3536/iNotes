const mongoose = require('mongoose');

const connectToMongoose = () =>{
    mongoose.connect('mongodb+srv://chiragkumar3536:Chirag%40738@cluster0.y9xpc98.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/inotes');
}

module.exports = connectToMongoose;
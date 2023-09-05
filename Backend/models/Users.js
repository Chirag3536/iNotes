const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    
    name:{
        type : 'string',
        required: true
    },
    email: {
        type : 'string',
        unique : true,
        required: true
    },
    password:{
        type : 'string',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }

  });

  const User = mongoose.model('user', userSchema);
  module.exports = User;
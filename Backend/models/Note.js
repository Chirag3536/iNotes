const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    
    title:{
        type : 'string'
    },
    description: {
        type : 'string'
    },
    tag: {
        type : 'string',
        default : "General"
    },
    date: {
        type: Date,
        default: Date.now
    }

  });


  module.exports = mongoose.model('notes', notesSchema);
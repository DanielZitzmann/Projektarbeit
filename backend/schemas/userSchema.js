//Schema für User
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Name:{
        type=String,
        required: true
    },
    
    Freunde:{
        type=Array,
        required:false
    }
}, {timestamps = true});

const User = mongoose.model('User',userSchema);
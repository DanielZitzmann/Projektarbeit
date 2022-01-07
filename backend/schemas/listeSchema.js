//Schema für Liste
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listeSchema = new Schema({
    Name:{
        type=String,
        required=true
    },

    Artikel:{
        type=Array,
        required=false
    },

    User:{
        type=Array,
        required=true
    }
}, {timestamps = true});

    const Tags = mongoose.model('Liste',listeSchema);

    module.exports = Listen;
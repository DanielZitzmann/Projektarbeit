//Schema für Laden
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ladenSchema = new Schema({
    Name:{
        type: String,
        required=true
    },
    //Adresse fehlt

    User:{
        type: String,
        required=true
    }

}, {timestamps = true});

const Laden = mongoose.model('Laden',ladenSchema);

module.exports = Laden;
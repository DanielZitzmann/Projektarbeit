//Schema für Tags
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
    Tag:{
       type=String,
       required=tue
    }
}, {timestamps = true});

const Tags = mongoose.model('Tags',tagSchema);
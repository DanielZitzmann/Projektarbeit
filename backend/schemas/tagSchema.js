//Schema für Tags
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema(
    {
        Tag: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;

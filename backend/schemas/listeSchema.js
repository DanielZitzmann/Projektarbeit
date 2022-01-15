//Schema für Liste
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listeSchema = new Schema({
        Name: {
            type: String,
            required: true,
        },

        Artikel: {
            type: Array,
            required: false,
        },

        User: {
            type: Array,
            required: false,
        },
    },
    { timestamps: true }
);

const Liste = mongoose.model("Liste", listeSchema);

module.exports = Liste;

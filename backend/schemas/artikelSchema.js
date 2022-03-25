//Schema für Artikel
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artikelSchema = new Schema(
    {
        Bezeichnung: {
            type: String,
            required: true,
        },
        Tags: {
            type: Array,
            required: false,
        },
        User: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const Artikel = mongoose.model("Artikel", artikelSchema);

module.exports = Artikel;

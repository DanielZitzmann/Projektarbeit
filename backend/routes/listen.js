var express = require("express");
var router = express.Router();
var Liste = require("../schemas/listeSchema");

//get all lists
router.get("/", async (req, res) => {
    try {
        const liste = await Liste.find();
        console.log(liste);
        res.json(liste);
    } catch (err) {
        res.json({ message: err });
    }
});

//add new list

router.post("/", async (req, res) => {
    try {
        const list = new Liste({
            Bezeichnung: req.body.Name,
            Artikel: req.body.Artikel,
            User: req.body.User
        });
        try {
            const savedList = await list.save();
            console.log("artikel added\n" + savedArtikel);
            res.json(savedArtikel);
        } catch (err) {
            res.json({ message: err });
        }
    }
})
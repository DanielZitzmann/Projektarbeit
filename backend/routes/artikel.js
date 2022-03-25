var express = require("express");
var router = express.Router();
var Artikel = require("../schemas/artikelSchema");

//get all artikel
router.get("/", async (req, res) => {
    try {
        const artikel = await Artikel.find({ User: req.userid });
        console.log(artikel);
        res.json(artikel);
    } catch (err) {
        res.json({ message: err });
    }
});

//get 1 artikel by id
router.get("/:id", async (req, res) => {
    try {
        const artikel = await Artikel.findOne({ _id: req.params.id });
        //console.log(artikel);
        res.json(artikel);
    } catch (err) {
        res.json({ message: err });
    }
});

//Middleware checks if Artikel already exists
router.post("/", async (req, res, next) => {
    try {
        const artikel = await Artikel.findOne({
            Bezeichnung: req.body.Bezeichnung,
            User: req.userid,
        });
        //console.log(artikel);
        if (artikel !== null) {
            res.json({ message: "Artikel already exists" });
        } else {
            next();
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//add new Artikel
router.post("/", async (req, res) => {
    const artikel = new Artikel({
        Bezeichnung: req.body.Bezeichnung,
        Tags: req.body.Tags,
        User: req.userid,
    });
    try {
        const savedArtikel = await artikel.save();
        console.log("artikel added\n" + savedArtikel);
        res.json(savedArtikel);
    } catch (err) {
        res.json({ message: err });
    }
});

//Middleware checks if artikel exists
router.delete("/:id", async (req, res, next) => {
    try {
        const artikel = await Artikel.findOne({ _id: req.params.id });
        if (artikel !== null) {
            next();
        } else {
            res.status(404);
            res.json("Artikel doesn´t exist");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//delete artikel by id
router.delete("/:id", async (req, res) => {
    try {
        await Artikel.deleteOne({ _id: req.params.id });
        console.log("artikel deleted");

        res.json({ message: `${req.params.id} deleted` });
    } catch (err) {
        res.json({ message: err });
    }
});

//Middleware checks if artikel exists
router.patch("/:id", async (req, res, next) => {
    try {
        const artikel = await Artikel.findOne({ _id: req.params.id });
        if (artikel !== null) {
            next();
        } else {
            res.status(404);
            res.json("Artikel doesn´t exist");
        }
    } catch (err) {
        res.json({ message: err });
    }
});
//updates existing artikel... Bezeichnung, Tags will be replaced completely
router.patch("/:id", async (req, res) => {
    try {
        const updatedArtikel = await Artikel.updateOne(
            { _id: req.params.id },
            { $set: { Bezeichnung: req.body.Bezeichnung, Tags: req.body.Tags } }
        );
        res.json(updatedArtikel);
    } catch (err) {
        res.json({ message: err });
    }
});

//export this router to use in our index.js
module.exports = router;

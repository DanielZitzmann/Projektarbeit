var express = require("express");
var router = express.Router();
var Artikel = require("../schemas/artikelSchema");

router.get("/", async (req, res) => {
    try {
        const artikel = await Artikel.find();
        console.log(artikel);
        res.json(artikel);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const artikel = await Artikel.findOne({ _id: req.params.id });
        console.log(artikel);
        res.json(artikel);
    } catch (err) {
        res.json({ message: err });
    }
});

//middleware test
router.use("/:id", (req, res, next) => {
    suche = req.params.id;
    console.log("suche aufgegeben" + suche);
    next();
});

router.get("/:id", function (req, res) {
    var currArtikel = artikel.filter(function (artikel) {
        if (artikel.id == suche) {
            return true;
        }
    });

    if (currArtikel.length == 1) {
        res.json(currArtikel[0]);
    } else {
        res.status(404); //Set status to 404 as movie was not found
        res.json({ message: "Not Found" });
    }
});

router.delete("/:id", (req, res) => {
    artikel = artikel.filter(function (a) {
        if (a.id != req.params.id) {
            return true;
        }
    });
    console.log(artikel);
    res.send("artikel id " + req.params.id + " gelöscht");
});

//export this router to use in our index.js
module.exports = router;

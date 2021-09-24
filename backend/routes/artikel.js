var express = require("express");
var router = express.Router();

var artikel = [
    { id: 1, name: "Milch" },
    { id: 2, name: "Kaffee" },
    { id: 3, name: "Zucker" },
    { id: 4, name: "Brot" },
    { id: 5, name: "Mehl" },
    { id: 6, name: "Käse" },
    { id: 9, name: "Wurscht" },
];

var suche = "";

router.get("/", function (req, res) {
    res.send(artikel);
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

var express = require("express");
var router = express.Router();
var Liste = require("../schemas/listeSchema");
var Artikel = require("../schemas/artikelSchema");
var User = require("../schemas/userSchema");

//get all lists
router.get("/", async (req, res) => {
    try {
        // const liste = await Liste.find({ Users: { $contains: req.userid } });
        const liste = await Liste.find({ Users: req.userid });
        //console.log(liste);
        res.json(liste);
    } catch (err) {
        res.json({ message: err });
    }
});

//add new list
router.post("/", async (req, res) => {
    const list = new Liste({
        Name: req.body.Name,
        Artikel: req.body.Artikel,
        Users: req.userid,
    });
    try {
        const savedList = await list.save();
        console.log("list added\n" + savedList);
        res.json(savedList);
    } catch (err) {
        res.json({ message: err });
    }
});

//get list by id
router.get("/:id", async (req, res) => {
    try {
        const list = await Liste.findOne({ _id: req.params.id });
        console.log(list);
        res.json(list);
    } catch (err) {
        res.json({ message: err });
    }
});

//update list by id (name)
//check if list exists
router.patch("/:id", async (req, res, next) => {
    try {
        const list = await Liste.findOne({ _id: req.params.id });
        if (list !== null) {
            next();
        } else {
            res.status(404);
            res.json("List doesn´t exist");
        }
    } catch (err) {
        res.json({ message: err });
    }
});
//updates existing list... Bezeichnung
router.patch("/:id", async (req, res) => {
    try {
        const updatedList = await Liste.updateOne(
            { _id: req.params.id },
            { $set: { Name: req.body.Name } }
        );
        res.json(updatedList);
    } catch (err) {
        res.json({ message: err });
    }
});

//delete list by id
//check if list exists
router.delete("/:id", async (req, res, next) => {
    try {
        const liste = await Liste.findOne({ _id: req.params.id });
        if (liste !== null) {
            next();
        } else {
            res.status(404);
            res.json("Liste doesn´t exist");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//delete artikel by id
router.delete("/:id", async (req, res) => {
    try {
        await Liste.deleteOne({ _id: req.params.id });
        console.log("liste deleted");

        res.json({ message: `${req.params.id} deleted` });
    } catch (err) {
        res.json({ message: err });
    }
});

//add article to List

//check if list exists
router.patch("/:id/:artikel", async (req, res, next) => {
    try {
        const liste = await Liste.findOne({ _id: req.params.id });
        if (liste !== null) {
            next();
        } else {
            res.status(404);
            res.json("Liste doesn´t exist");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

router.patch("/:id/:artikel", async (req, res) => {
    //get article
    console.log(req.params.artikel);
    try {
        const artikel = await Artikel.findOne({
            Bezeichnung: req.params.artikel,
        });
        if (artikel == null) {
            res.status(404).json(
                `Artikel  ${req.params.artikel} doesn´t exist`
            );
            return;
        } else {
            console.log(artikel);
        }
        const updatedList = await Liste.updateOne(
            { _id: req.params.id },
            { $addToSet: { Artikel: artikel.Bezeichnung } }
        );
        res.json(updatedList);
    } catch (err) {
        res.json({ message: err });
    }
});

//remove article from list

//check if list exists
router.delete("/:id/artikel", async (req, res, next) => {
    try {
        const liste = await Liste.findOne({ _id: req.params.id });
        if (liste !== null) {
            next();
        } else {
            res.status(404);
            res.json("Liste doesn´t exist");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete("/:id/artikel", async (req, res) => {
    try {
        console.log(req.body.artikelName);
        const updatedList = await Liste.updateOne(
            { _id: req.params.id },
            { $pull: { Artikel: req.body.artikelName } }
        );
        res.json(updatedList);
    } catch (err) {
        res.json({ message: err });
    }
});

//addUsertoList
router.patch("/:id/addUser/test", async (req, res, next) => {
    try {
        console.log("hier");
        const liste = await Liste.findOne({ _id: req.params.id });
        if (liste !== null) {
            next();
        } else {
            res.status(404);
            res.json("Liste doesn´t exist");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

const userExists = async function (req, res, next) {
    try {
        const user = await User.findOne({ Name: req.body.Username });
        console.log(user);
        if (user == null) {
            res.status(400).json({ message: "User doesn´t exist" });
        } else {
            req.newUserID = user.id;
            console.log(req.newUserID);
            next();
        }
    } catch (err) {
        res.json({ message: err });
    }
};

router.patch("/:id/addUser/test", userExists, async (req, res) => {
    try {
        const update = await Liste.updateOne(
            { _id: req.params.id },
            { $push: { Users: req.newUserID } }
        );
        console.log(update);
        res.json(update);
    } catch (err) {
        res.status(401).json({ message: err });
    }
});

module.exports = router;

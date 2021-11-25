var express = require("express");
var router = express.Router();
var Tag = require("../schemas/tagSchema");

//gets all tags
router.get("/", async (req, res) => {
    try {
        const tags = await Tag.find();
        console.log(tags);
        res.json(tags);
    } catch (err) {
        res.json({ message: err });
    }
});

//gets specific tag by id
router.get("/:id", async (req, res) => {
    try {
        const tag = await Tag.findOne({ _id: req.params.id });
        console.log(tag);
        if (tag !== null) res.json(tag);
        else {
            res.status(404);
            res.json("tag doesn´t exist");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//Middleware checks if Tag already exists
router.post("/", async (req, res, next) => {
    try {
        const tag = await Tag.findOne({ Tag: req.body.TagName });
        //console.log(tag);
        if (tag !== null) {
            res.json({ message: "Tag already exists" });
        } else {
            next();
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//add new Tag
router.post("/", async (req, res) => {
    const tag = new Tag({
        Tag: req.body.TagName,
    });
    try {
        const savedTag = await tag.save();
        console.log("tag added\n" + tag);
        res.json(savedTag);
    } catch (err) {
        res.json({ message: err });
    }
});

//Middleware checks if tag exists
router.delete("/:id", async (req, res, next) => {
    try {
        const tag = await Tag.findOne({ _id: req.params.id });
        if (tag !== null) {
            next();
        } else {
            res.status(400).json("Tag doesn´t exist");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//delete Tag by id
router.delete("/:id", async (req, res) => {
    try {
        await Tag.deleteOne({ _id: req.params.id });
        console.log("tag deleted");

        res.json({ message: `${req.params.id} deleted` });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

module.exports = router;

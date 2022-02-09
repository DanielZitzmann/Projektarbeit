var express = require("express");
var bcrypt = require("bcrypt");
var router = express.Router();
var jwt = require("jsonwebtoken");
var User = require("../schemas/userSchema");

const userExists = async function (req, res, next) {
    try {
        const user = await User.findOne({ Name: req.body.Name });
        if (user !== null) {
            res.status(400).json({ message: "User already exists" });
        } else {
            next();
        }
    } catch (err) {
        res.json({ message: err });
    }
};

router.post("/register", userExists, async (req, res) => {
    try {
        if (req.body.Password == "" || req.body.Password == null)
            return res.status(400).json({ message: "Please enter a password" });

        if (req.body.Name == "" || req.body.Name == null)
            return res.status(400).json({ message: "Please enter a username" });

        if (req.body.Password.length < 8)
            return res
                .status(400)
                .json({ message: "Password length to short (min 8 chars)" });

        // hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPW = await bcrypt.hash(req.body.Password, salt);
        const user = new User({
            Name: req.body.Name,
            Password: hashedPW,
        });
        const newUser = await user.save();
        res.json(newUser);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post("/login", async (req, res) => {
    try {
        //user exists?
        const user = await User.findOne({ Name: req.body.Name });
        if (!user)
            return res.status(400).json({ message: "User doesn´t exist" });
        //password correct?
        const pwCheck = await bcrypt.compare(req.body.Password, user.Password);
        if (!pwCheck)
            return res.status(400).json({ message: "Wrong password" });

        //create and send JWT
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.header("user-token", token).json({
            message: "Logged in",
            token: token,
            _id: user._id,
        });
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;

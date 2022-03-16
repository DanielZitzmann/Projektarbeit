const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("No Access!");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        req.userid = req.user._id;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};

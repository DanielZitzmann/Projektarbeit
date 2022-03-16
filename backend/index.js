const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3001;

require("dotenv").config();
app.use(cors());
app.use(express.json());

//db connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ecudo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose
    .connect(uri, connectionParams)
    .then(() => {
        console.log(`Connected to database as User ${process.env.DB_USER}`);
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

//import routes'
var artikelRoute = require("./routes/artikel");
var tagsRoute = require("./routes/tags");
var listenRoute = require("./routes/listen");
var authRoute = require("./routes/authentication");
var tokenVerification = require("./routes/verifyToken");

//middleware
app.use("/api/v1/tags", tokenVerification);
app.use("/api/v1/tags", tagsRoute);

app.use("/api/v1/artikel", tokenVerification);
app.use("/api/v1/artikel", artikelRoute);

app.use("/api/v1/listen", tokenVerification);
app.use("/api/v1/listen", listenRoute);

app.use("/api/v1/auth", authRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

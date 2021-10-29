const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3001;

require("dotenv").config();
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

//middleware
app.use("/api/v1/artikel", artikelRoute);
app.use("/api/v1/tags", tagsRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

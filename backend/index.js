const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3001;
var artikelroute = require("./routes/artikel.js");

app.use(bodyParser.json());

app.use("/artikel", artikelroute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const express = require("express");
const app = express();
const port = 3001;

require("dotenv").config();
app.use(express.json());

//import routes
var artikelroute = require("./routes/artikel.js");

//middleware
app.use("/artikel", artikelroute);

console.log(process.env.SECRET_PW);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

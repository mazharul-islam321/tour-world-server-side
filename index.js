const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// importent code
app.get("/", (req, res) => {
    res.send("hello fucking  world");
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

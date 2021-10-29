const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lw2vc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// console.log(uri);
// server and mongodb connection
async function run() {
    try {
        await client.connect();
        const database = client.db("tourWorld");
        const destinationCollection = database.collection("destination");
        // get api for all data
        app.get("/allbooking", async (req, res) => {
            const cursor = destinationCollection.find({});
            const destinations = await cursor.toArray();
            res.send(destinations);
        });

        // Post api
        app.post("/allbooking", async (req, res) => {
            const booking = req.body;
            const result = await destinationCollection.insertOne(booking);
            // console.log("A document was inserted with the _id:", result);
            res.json(result);
        });
    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);
// important code
app.get("/", (req, res) => {
    res.send("hello tour world");
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

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

// server and mongodb connection
async function run() {
    try {
        await client.connect();
        const database = client.db("tourWorld");
        const destinationCollection = database.collection("destination");
        const placeBookingCollection = database.collection("placeOrder");
        // get api for all data
        app.get("/allbooking", async (req, res) => {
            const cursor = destinationCollection.find({});
            const destinations = await cursor.toArray();
            res.send(destinations);
        });

        //get api for a single data
        app.get("/allbooking/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const singleBookingInfo = await destinationCollection.findOne(
                query
            );
            // console.log(singleBookingInfo);
            res.send(singleBookingInfo);
        });

        // Post api
        app.post("/allbooking", async (req, res) => {
            const booking = req.body;
            const result = await destinationCollection.insertOne(booking);
            // console.log("A document was inserted with the _id:", result);
            res.json(result);
        });
        // get api
        app.get("/manageallorder", async (req, res) => {
            const manageorder = await placeBookingCollection.find({}).toArray();
            res.send(manageorder);
        });
        // get api for place booking
        app.get("/mybooking/:email", async (req, res) => {
            const email = req.params.email;
            const mybooking = await placeBookingCollection
                .find({ email })
                .toArray();
            // console.log(mybooking);
            res.send(mybooking);
        });

        // post api for booking order collection

        app.post("/placebooking", async (req, res) => {
            const placebooking = req.body;
            const result = await placeBookingCollection.insertOne(placebooking);
            console.log("A document was inserted with the _id:", result);
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

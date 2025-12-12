const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// MVC
const userRouter = require("./routes/user.routes");
const usersController = require("./controllers/users.controller");
// const userRouter = require("./routes/user.routes");
// const usersController = require("./controllers/users.controller");

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2uczcxe.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //  exports.bdDistrictsCollection = client
    //     .db("cityTicket")
    //     .collection("bdDistricts");
    //     exports.accountsDataCollection = client
    //     .db("cityTicket")
    //     .collection("accountsData");
    //     exports.busDataCollection = client.db("cityTicket").collection("busData");
    //     exports.supervisorDataCollection = client
    //     .db("cityTicket")
    //     .collection("supervisorData");
    const collections = {
      bdDistrictsCollection: client.db("cityTicket").collection("bdDistricts"),
      allZillaCollection: client.db("cityTicket").collection("allZilla"),
      reservationCollection: client.db("cityTicket").collection("reservation"),
      accountsDataCollection: client
        .db("cityTicket")
        .collection("accountsData"),

      busDataCollection: client.db("cityTicket").collection("busData"),

      destinationCollection: client.db("cityTicket").collection("destination"),

      supervisorDataCollection: client
        .db("cityTicket")
        .collection("supervisorData"),

      seatDataCollection: client.db("cityTicket").collection("seat"),
    };

    usersController.setupCollections(collections);
    // app.use
    app.use(userRouter);
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Nabilar Chocolate House");
});

app.listen(port, () => {
  console.log(`Nabila loves chocolate ${port}`);
});

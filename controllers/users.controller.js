const { ObjectId } = require("mongodb");

let bdDistrictsCollection;
let accountsDataCollection;
let busDataCollection;
let supervisorDataCollection;
let seatDataCollection;
let reservationCollection;
let destinationCollection;
let allZillaCollection;

exports.setupCollections = (collections) => {
  bdDistrictsCollection = collections.bdDistrictsCollection;
  accountsDataCollection = collections.accountsDataCollection;
  busDataCollection = collections.busDataCollection;
  supervisorDataCollection = collections.supervisorDataCollection;
  seatDataCollection = collections.seatDataCollection;
  reservationCollection = collections.reservationCollection;
  destinationCollection = collections.destinationCollection;
  allZillaCollection = collections.allZillaCollection;
};

exports.getTicket = async (req, res) => {
  const result = await bdDistrictsCollection.find().toArray();
  res.send(result);
};

exports.getDestinationAll = async (req, res) => {
  const result = await destinationCollection.find().toArray();
  res.send(result);
};

exports.getAllZilla = async (req, res) => {
  const result = await allZillaCollection.find().toArray();
  res.send(result);
};

exports.getAccount = async (req, res) => {
  const result = await accountsDataCollection.find().toArray();
  res.send(result);
};

exports.getSupervisors = async (req, res) => {
  const result = await supervisorDataCollection
    .find()
    .sort({ createdAt: 1 })
    .toArray();
  res.send(result);
};

exports.getSingleSupervisor = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await supervisorDataCollection.findOne(query);
  res.send(result);
};

exports.updateSupervisors = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedSupervisor = req.body;

  const supervisor = {
    $set: {
      name: updatedSupervisor.name,
      phone: updatedSupervisor.phone,
      nid: updatedSupervisor.nid,
      presentAddress: updatedSupervisor.presentAddress,
      permanentAddress: updatedSupervisor.permanentAddress,
    },
  };

  const result = await supervisorDataCollection.updateOne(
    filter,
    supervisor,
    options
  );
  res.send(result);
};

exports.getAllBus = async (req, res) => {
  const result = await busDataCollection
    .find()
    .sort({ createdAt: 1 })
    .toArray();
  res.send(result);
};

exports.getSeats = async (req, res) => {
  const result = await seatDataCollection
    .find()
    .sort({ row: 1, "seats.id": 1 })
    .toArray();
  res.send(result);
};

exports.deleteAccount = async (req, res) => {
  const id = req.params.id;
  const result = await accountsDataCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
};

exports.getUserByEmail = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const result = await accountsDataCollection.findOne(query);
  res.send(result);
};

exports.postTickets = async (req, res) => {
  const item = req.body;
  const result = await supervisorDataCollection.insertOne(item);
  res.send(result);
};

exports.postSeatReservation = async (req, res) => {
  const item = req.body;
  const result = await reservationCollection.insertOne(item);
  res.send(result);
};

// get selected seat bus
// exports.getReservedData = async (req, res) => {
//   const busId=req.params.id;
//   console.log(busId)
//   const filter= {_id: new ObjectId(busId)}
//   const result = await reservationCollection.findOne(filter)

//   res.send(result)
// }

exports.getReservedData = async (req, res) => {
  const busId = req.params.id;
  // console.log("Received request for busId:", busId);

  try {
    // Find all documents that match the specified busId
    const filter = { busId: busId };
    // console.log("Filter:", filter);

    const result = await reservationCollection.find(filter).toArray();

    if (result.length > 0) {
      // console.log("Found reservation data:", result);
      res.json(result);
    } else {
      console.log("No reservation data found for the given busId");
      res
        .status(404)
        .json({ error: "No reservation data found for the given busId" });
    }
  } catch (error) {
    console.error("Error fetching reservation data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// exports.getReservedSeatsByBusId = async (req, res) => {
//   const busId = req.body.busId;

//   try {
//     const query = { busId: new ObjectId(busId) }; // Assuming busId is stored as an ObjectId
//     const result = await reservationCollection.find(busId).toArray();
//     res.send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };
// try {
//   const filter = { "seats.id": seatId };
//   const update = {
//     $set: {
//       "seats.$.reserved": true,
//       "seats.$.gender": updateData.gender,
//     },
//   };

//   const result = await seatDataCollection.updateOne(filter, update);

//   if (result.modifiedCount > 0) {
//     res.status(200).json({ message: 'Seat status updated successfully' });
//   } else {
//     res.status(404).json({ message: 'Seat not found' });
//   }
// } catch (error) {
//   console.error(error);
//   res.status(500).json({ message: 'Internal server error' });
// }

exports.getDestination = async (req, res) => {
  const result = await destinationCollection
    .find(
      {
        name: { $regex: req.params.text },
      },
      { projection: { name: 1 } }
    )
    .toArray();
  res.send(result);
};

exports.addSupervisors = async (req, res) => {
  const item = req.body;
  const result = await supervisorDataCollection.insertOne(item);
  res.send(result);
};

exports.addAccount = async (req, res) => {
  const accountData = req.body;
  const result = await accountsDataCollection.insertOne(accountData);
  res.send(result);
};

exports.addbus = async (req, res) => {
  const body = req.body;
  const result = await busDataCollection.insertOne(body);
  res.send(result);
};

exports.getFixSeat = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await busDataCollection.findOne(query);
  res.send(result);
};

// exports.getselectedSeat = async (req, res) => {
//   const { busId } = req.params;
//   const { selectedSeats } = req.body;

//   try {
//     const result = await busDataCollection.updateOne(
//       { _id: new ObjectId(busId) },
//       { $set: { selectedSeats: selectedSeats
//       } }
//     );

//     if (result.modifiedCount > 0) {
//       res.status(200).json({ message: 'Bus data updated successfully' });
//     } else {
//       res.status(404).json({ message: 'Bus not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

exports.deletebus = async (req, res) => {
  const id = req.params.id;
  const result = await busDataCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
};

exports.deleteSupervisors = async (req, res) => {
  const id = req.params.id;
  const result = await supervisorDataCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
};

// search

// exports.searchDestination = async (req, res) => {
//   const searchText = req.params.text;
//   const result = await busDataCollection
//     .find({
//       $or: [{ names: { $regex: searchText, $options: "i" } }],
//     })
//     .toArray();
//   res.send(result);
// };

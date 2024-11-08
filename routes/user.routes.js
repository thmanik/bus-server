const express = require("express");
const { ObjectId } = require("mongodb");
const {
  getTicket,
  getAllBus,
  getUserByEmail,
  postTickets,
  getFixSeat,
  addSupervisors,
  addAccount,
  addbus,
  deletebus,
  deleteSupervisors,
  getAccount,
  getSupervisors,
  deleteAccount,
  updateSupervisors,
  getSingleSupervisor,
  getSeats,
  postSeatReservation,
  // updateSeatReservationStatus,
  // getselectedSeat,
  getReservedData,
  getReservedSeatsByBusId,
  getDestination,
  getDestinationAll,
  getAllZilla
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/allNames/:text", getDestination);
router.get("/allNames", getDestinationAll);
router.get("/supervisors", getSupervisors);
router.get("/seats", getSeats);
router.delete("/supervisors/:id", deleteSupervisors);
router.get("/supervisors/:id", getSingleSupervisor);
router.put("/supervisors/:id", updateSupervisors);
router.get("/allbus", getAllBus);
router.get("/allbus/:id", getFixSeat);
router.get("/users/:email", getUserByEmail);
router.post("/ticket", postTickets);
router.post("/seat-reservation", postSeatReservation);
// router.get("/destinationSearch/:text", searchDestination);

// get selected seat bus
router.get("/resarvedSeat/:id", getReservedData);
// router.get("/reserved-seats/:busId", getReservedSeatsByBusId);

// router.put("/allbus/:busId", getselectedSeat);
// router.put("/seat-reservation/:id", updateSeatReservationStatus);
router.post("/supervisor", addSupervisors);
router.post("/add-account", addAccount);
router.get("/add-account", getAccount);
router.delete("/delete-account/:id", deleteAccount);
router.post("/addbus", addbus);
router.delete("/deletebus/:id", deletebus);
router.get("/ticket", getTicket);
router.get("/allZilla", getAllZilla);

module.exports = router;

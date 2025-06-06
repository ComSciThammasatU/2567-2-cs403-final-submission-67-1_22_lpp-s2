const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/", authenticate, bookingController.createBooking);
router.put("/cancel/:id", authenticate, bookingController.cancelBooking);
router.get("/:id", authenticate, bookingController.viewBooking);
router.get("/", authenticate, bookingController.viewAllBookings);
router.put(
  "/:id",
  authenticate,
  authorize(["approval"]),
  bookingController.editBooking
);
router.put(
  "/",
  authenticate,
  authorize(["approval"]),
  bookingController.editBookings
);
module.exports = router;

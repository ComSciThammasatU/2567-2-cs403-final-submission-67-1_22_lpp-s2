const express = require("express");
const router = express.Router();
const approvalController = require("../controllers/approvalController");

const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post(
  "/approve/:booking_id",
  authenticate,
  authorize(["approval"]),
  approvalController.approveBooking
);
router.post(
  "/reject/:booking_id",
  authenticate,
  authorize(["approval"]),
  approvalController.rejectBooking
);
router.get(
  "/:booking_id",
  authenticate,
  approvalController.getApprovalByBookingId
);
router.get(
  "/",
  authenticate,
  authorize(["approval"]),
  approvalController.getAllApprovals
);
router.post(
  "/editbooking",
  authenticate,
  authorize(["approval"]),
  approvalController.editBooking
);

module.exports = router;

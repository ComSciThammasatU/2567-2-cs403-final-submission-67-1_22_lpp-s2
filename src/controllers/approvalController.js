const approvalService = require("../services/approvalService");

exports.approveBooking = async (req, res) => {
  const bookingId = req.params.booking_id;
  const userId = req.user.id;

  try {
    const approval = await approvalService.approveBooking(bookingId, userId);
    res.status(200).json({ message: "Booking approved", approval });
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Failed to approve booking" });
  }
};

exports.rejectBooking = async (req, res) => {
  const bookingId = req.params.booking_id;
  const userId = req.user.id;
  const { rejected_note } = req.body;

  if (!rejected_note) {
    return res.status(200).json({ message: "Rejection note is required" });
  }

  try {
    const rejection = await approvalService.rejectBooking(
      bookingId,
      userId,
      rejected_note
    );
    res.status(200).json({ message: "Booking rejected", rejection });
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Failed to reject booking" });
  }
};

exports.getApprovalByBookingId = async (req, res) => {
  const bookingId = req.params.booking_id;

  try {
    const approval = await approvalService.getApprovalByBookingId(bookingId);
    res.status(200).json(approval);
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Failed to fetch approval info" });
  }
};

exports.getAllApprovals = async (req, res) => {
  try {
    const approvals = await approvalService.getAllApprovals();
    res.status(200).json(approvals);
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Failed to fetch approvals" });
  }
};

exports.editBooking = async (req, res) => {
  const userId = req.user.id;
  const body = req.body;

  if (!body) {
    return res.status(200).json({ message: "Edit body is required" });
  }

  try {
    const edit = await approvalService.editBooking(userId, body);
    res.status(200).json({ message: "Bookings edited", edit });
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Failed to edit booking" });
  }
};

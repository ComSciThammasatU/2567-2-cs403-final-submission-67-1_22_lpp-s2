const bookingService = require("../services/bookingService");
const { snakeCaseKeys } = require("../utils/utils.js");

exports.createBooking = async (req, res) => {
  try {
    const result = await bookingService.createBooking(req.user, req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    await bookingService.cancelBooking(req.user, req.params.id);
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};

exports.viewBooking = async (req, res) => {
  try {
    const booking = await bookingService.viewBooking(
      req.user,
      req.params.booking_id
    );
    res.json(booking);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

exports.viewAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.viewAllBookings(req.user);
    res.json(bookings);
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};

exports.editBooking = async (req, res) => {
  try {
    await bookingService.editBooking(req.params.id, snakeCaseKeys(req.body));
    res.json({ message: "Booking updated" });
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};

exports.editBookings = async (req, res) => {
  try {
    await bookingService.editBookings(req.body);
    res.json({ message: "Bookings updated" });
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};

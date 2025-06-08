// controllers/roomController.js
const roomService = require("../services/roomService");

// ---- ROOMS ----
exports.createRoom = async (req, res) => {
  try {
    const room = await roomService.createRoom(req.body);
    res.status(201).json(room);
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Error creating room" });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.json(rooms);
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Error fetching rooms" });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await roomService.getRoomById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Error fetching room" });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    await roomService.updateRoom(req.params.id, req.body);
    res.json({ message: "Room updated" });
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Error updating room" });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    await roomService.deleteRoom(req.params.id);
    res.json({ message: "Room deleted" });
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Error deleting room" });
  }
};

// ---- ROOM-ACCESSORIES ----

// Assign accessory to a room
exports.assignAccessoryToRoom = async (req, res) => {
  const { roomId } = req.params;
  const { accessoryId, quantity } = req.body;

  try {
    await roomService.assignAccessoryToRoom(roomId, accessoryId, quantity);
    res.status(201).json({ message: "Accessory assigned to room" });
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Error assigning accessory" });
  }
};

// Get all accessories for a room
exports.getAccessoriesForRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    const accessories = await roomService.getAccessoriesForRoom(roomId);
    res.json(accessories);
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Error fetching accessories for room" });
  }
};

// Remove accessory from a room
exports.removeAccessoryFromRoom = async (req, res) => {
  const { roomId, accessoryId } = req.params;

  try {
    await roomService.removeAccessoryFromRoom(roomId, accessoryId);
    res.json({ message: "Accessory removed from room" });
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Error removing accessory from room" });
  }
};

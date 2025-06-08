// routes/roomRoutes.js
const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

// Room routes
router.post("/", roomController.createRoom);
router.get("/", roomController.getAllRooms);
router.get("/:id", roomController.getRoomById);
router.put("/:id", roomController.updateRoom);
router.delete("/:id", roomController.deleteRoom);

// Assign accessory to a room
router.post("/:roomId/accessories", roomController.assignAccessoryToRoom); // Assign accessory to a room
router.get("/:roomId/accessories", roomController.getAccessoriesForRoom); // Get all accessories for a room
router.delete(
  "/:roomId/accessories/:accessoryId",
  roomController.removeAccessoryFromRoom
); // Remove accessory from room

module.exports = router;

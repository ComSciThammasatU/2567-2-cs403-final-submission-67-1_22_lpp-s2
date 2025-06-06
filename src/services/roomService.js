// services/roomService.js
const pool = require("../db/db");

// ---- ROOMS ----
exports.createRoom = async ({ room_type, capacity, floor }) => {
  const result = await pool.query(
    "INSERT INTO rooms (room_type, capacity, floor) VALUES ($1, $2, $3) RETURNING *",
    [room_type, capacity, floor]
  );
  return result.rows[0];
};

exports.getAllRooms = async () => {
  const result = await pool.query("SELECT * FROM rooms");
  return result.rows;
};

exports.getRoomById = async (id) => {
  const result = await pool.query("SELECT * FROM rooms WHERE id = $1", [id]);
  return result.rows[0] || null;
};

exports.updateRoom = async (id, { room_type, capacity, floor }) => {
  await pool.query(
    "UPDATE rooms SET room_type = COALESCE($1, room_type), capacity = COALESCE($2, capacity), floor = COALESCE($3, floor) WHERE id = $4",
    [room_type, capacity, floor, id]
  );
};

exports.deleteRoom = async (id) => {
  await pool.query("DELETE FROM rooms WHERE id = $1", [id]);
};

// ---- ROOM-ACCESSORIES ----

// Assign an accessory to a room
exports.assignAccessoryToRoom = async (roomId, accessoryId, quantity) => {
  const result = await pool.query(
    "INSERT INTO room_accessories (room_id, accessory_id, quantity) VALUES ($1, $2, $3) RETURNING *",
    [roomId, accessoryId, quantity]
  );
  return result.rows[0];
};

// Get all accessories assigned to a room
exports.getAccessoriesForRoom = async (roomId) => {
  const result = await pool.query(
    "SELECT a.id, a.name, a.type, ra.quantity FROM accessories a " +
      "JOIN room_accessories ra ON a.id = ra.accessory_id " +
      "WHERE ra.room_id = $1",
    [roomId]
  );
  return result.rows;
};

// Remove an accessory from a room
exports.removeAccessoryFromRoom = async (roomId, accessoryId) => {
  await pool.query(
    "DELETE FROM room_accessories WHERE room_id = $1 AND accessory_id = $2",
    [roomId, accessoryId]
  );
};

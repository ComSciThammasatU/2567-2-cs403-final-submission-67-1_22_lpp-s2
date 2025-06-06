const pool = require("../db/db");

exports.createAccessory = async ({ name, type, amount, remaining_amount }) => {
  const result = await pool.query(
    "INSERT INTO accessories (name, type, amount, remaining_amount) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, type, amount, remaining_amount]
  );
  return result.rows[0];
};

exports.getAllAccessories = async () => {
  const result = await pool.query("SELECT * FROM accessories");
  return result.rows;
};

exports.getAccessoryById = async (id) => {
  const result = await pool.query("SELECT * FROM accessories WHERE id = $1", [
    id,
  ]);
  return result.rows[0] || null;
};

exports.updateAccessory = async (
  id,
  { name, type, amount, remaining_amount }
) => {
  await pool.query(
    "UPDATE accessories SET name = COALESCE($1, name), type = COALESCE($2, type), amount = COALESCE($3, amount), remaining_amount = COALESCE($4, remaining_amount) WHERE id = $5",
    [name, type, amount, remaining_amount, id]
  );
};

exports.deleteAccessory = async (id) => {
  await pool.query("DELETE FROM accessories WHERE id = $1", [id]);
};

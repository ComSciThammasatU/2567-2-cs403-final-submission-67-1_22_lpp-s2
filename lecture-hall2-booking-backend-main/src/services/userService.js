const pool = require("../db/db");
const { camelCaseKeys } = require("../utils/utils.js");

exports.getUserById = async (id) => {
  const result = await pool.query(
    "SELECT id, first_name, last_name, userfirst_name, last_name, role_id FROM users WHERE id = $1",
    [id]
  );
  return camelCaseKeys(result.rows[0]) || null;
};

exports.getAllUsers = async () => {
  const result = await pool.query(
    "SELECT id, first_name, last_name, userfirst_name, last_name, role_id FROM users"
  );
  return camelCaseKeys(result.rows);
};

exports.updateUser = async (id, { first_name, last_name, role_id }) => {
  await pool.query(
    "UPDATE users SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), role_id = COALESCE($3, role_id) WHERE id = $3",
    [first_name, last_name, role_id, id]
  );
};

exports.deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");
require("dotenv").config();

exports.registerUser = async ({
  first_name,
  last_name,
  username,
  password,
  role_id,
}) => {
  const existing = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (existing.rows.length > 0) {
    throw { status: 200, message: "username already registered" };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (first_name, last_name, username, password, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, username, role_id",
    [first_name, last_name, username, passwordHash, role_id || 2]
  );

  return result.rows[0];
};

exports.loginUser = async ({ username, password }) => {
  const result = await pool.query(
    "SELECT ur.*, u.* FROM users u INNER JOIN user_roles ur ON u.role_id = ur.id WHERE u.username = $1",
    [username]
  );

  if (result.rows.length === 0) {
    throw { status: 200, message: "Invalid credentials" };
  }

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw { status: 200, message: "Invalid credentials" };
  }

  return {
    message: "Login successful",
    username: result.rows[0].username,
    role: result.rows[0].name,
    token: jwt.sign(
      { id: user.id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    ),
  };
};

const userService = require("../services/userService");
const jwt = require("jsonwebtoken");

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  const { first_name, last_name, role_id } = req.body;
  try {
    await userService.updateUser(req.params.id, {
      first_name,
      last_name,
      role_id,
    });
    res.json({ message: "User updated" });
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Server error" });
  }
};

// For testing: generate a JWT manually
exports.getAuthentication = (req, res) => {
  try {
    const payload = { id: 2, name: "approval", role_id: 1 };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json(`Bearer ${token}`);
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Server error" });
  }
};

const authService = require("../services/authService");

exports.registerUser = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    console.error(err);
    res.status(err.status || 200).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(err.status || 200).json({ message: err.message });
  }
};

// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Get User payload * for testing only
router.get("/getAuth", userController.getAuthentication);

// Get current user's profile
router.get("/me", authMiddleware, userController.getCurrentUser);

// approval: Get all users
router.get(
  "/",
  authMiddleware,
  roleMiddleware("approval"),
  userController.getAllUsers
);

// approval: Get user by ID
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("approval"),
  userController.getUserById
);

// approval: Update user role/info
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("approval"),
  userController.updateUser
);

// approval: Delete user
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("approval"),
  userController.deleteUser
);

module.exports = router;

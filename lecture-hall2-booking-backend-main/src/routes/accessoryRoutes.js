const express = require("express");
const router = express.Router();
const accessoryController = require("../controllers/accessoryController");

router.post("/", accessoryController.createAccessory);
router.get("/", accessoryController.getAllAccessories);
router.get("/:id", accessoryController.getAccessoryById);
router.put("/:id", accessoryController.updateAccessory);
router.delete("/:id", accessoryController.deleteAccessory);

module.exports = router;

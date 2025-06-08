const accessoryService = require("../services/accessoryService");

exports.createAccessory = async (req, res) => {
  try {
    const accessory = await accessoryService.createAccessory(req.body);
    res.status(201).json(accessory);
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Error creating accessory" });
  }
};

exports.getAllAccessories = async (req, res) => {
  try {
    const accessories = await accessoryService.getAllAccessories();
    res.json(accessories);
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Error fetching accessories" });
  }
};

exports.getAccessoryById = async (req, res) => {
  try {
    const accessory = await accessoryService.getAccessoryById(req.params.id);
    if (!accessory)
      return res.status(404).json({ message: "Accessory not found" });
    res.json(accessory);
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Error fetching accessory" });
  }
};

exports.updateAccessory = async (req, res) => {
  try {
    await accessoryService.updateAccessory(req.params.id, req.body);
    res.json({ message: "Accessory updated" });
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Error updating accessory" });
  }
};

exports.deleteAccessory = async (req, res) => {
  try {
    await accessoryService.deleteAccessory(req.params.id);
    res.json({ message: "Accessory deleted" });
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Error deleting accessory" });
  }
};

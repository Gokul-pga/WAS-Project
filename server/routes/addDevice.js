const express = require("express");
const {
  addDevice,
  getdevice,
  deleteDevice,
  getDevicesForUser,
} = require("../controller/devicesetup");
const router = express.Router();

router.post("/addDevice", addDevice);
router.get("/getDevice", getdevice);
router.delete("/:id", deleteDevice);
router.get("/getdevicesforuser", getDevicesForUser);

module.exports = router;

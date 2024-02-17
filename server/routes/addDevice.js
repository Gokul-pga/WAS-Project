const express = require("express");
const {
  addDevice,
  getdevice,
  deleteDevice,
  getDevicesForUser,
  get,
} = require("../controller/devicesetup");
const router = express.Router();

router.post("/addDevice", addDevice);
router.get("/getDevice", getdevice);
router.get("/get", get);
router.delete("/:id", deleteDevice);
router.get("/getdevicesforuser", getDevicesForUser);

module.exports = router;

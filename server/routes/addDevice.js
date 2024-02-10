const express = require("express");
const {
  addDevice,
  getdevice,
  deleteDevice,
} = require("../controller/devicesetup");
const router = express.Router();

router.post("/addDevice", addDevice);
router.get("/getDevice", getdevice);
router.delete("/:id", deleteDevice);

module.exports = router;

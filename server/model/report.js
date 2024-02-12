const mongoose = require("mongoose");

const report = new mongoose.Schema({
  username: String,
  devicename: String,
  sump_state: String,
  tank_state: String,
  sump_duration: String,
  tank_duration: String,
});

const reportData = mongoose.model("DeviceDataReport", report);
exports.reportData = reportData;

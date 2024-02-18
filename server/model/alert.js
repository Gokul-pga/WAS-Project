const mongoose = require("mongoose");

const alert = new mongoose.Schema({
  username: String,
  devicename: String,
  sump_state: String,
  tank_state: String,
  sump_duration: String,
  tank_duration: String,
  pH_value: String,
});

const alertData = mongoose.model("DeviceDataReport", alert);
exports.alertData = alertData;

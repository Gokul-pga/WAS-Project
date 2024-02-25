const mongoose = require("mongoose");

const alert = new mongoose.Schema({
  username: String,
  devicename: String,
  sump_state: String,
  tank_state: String,
  pH_value: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const alertData = mongoose.model("alertdatas", alert);
exports.alertData = alertData;

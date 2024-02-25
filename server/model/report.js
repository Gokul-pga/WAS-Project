const mongoose = require("mongoose");

const report = new mongoose.Schema({
  username: String,
  devicename: String,
  sump_value: Number,
  tank_value: Number,
  sump_duration: Number,
  tank_duration: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const reportData = mongoose.model("ReportData", report);
exports.reportData = reportData;

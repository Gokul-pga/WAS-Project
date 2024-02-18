const mongoose = require("mongoose");

const report = new mongoose.Schema({
  username: String,
  devicename: String,
  sump_value: Number,
  tank_value: Number,
});

const reportData = mongoose.model("ReportData", report);
exports.reportData = reportData;

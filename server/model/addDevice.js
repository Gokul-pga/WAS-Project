// const express = require("express");
// const mongoose = require("mongoose");

// const childSchema = new mongoose.Schema({
//   username: String,
//   devicename: String,
//   userId: String,
//   location: String,
//   status: String,
//   sump_vol: String,
//   tank_vol: String,
// });

// const device = new mongoose.Schema({
//   username: String,
//   userId: String,
//   device: [childSchema],
// });

// const devicedata = mongoose.model("deviceSetup", device);
// exports.devicedata = devicedata;

const express = require("express");
const mongoose = require("mongoose");

// Your child schema
const childSchema = new mongoose.Schema({
  username: String,
  devicename: String,
  userId: String,
  location: String,
  status: String,
  sump_vol: String,
  tank_vol: String,
});

// Your parent schema with the nested array
const deviceSchema = new mongoose.Schema({
  username: String,
  userId: String,
  email: String,
  devices: [childSchema], // Renamed 'device' to 'devices'
});

// Your model
const DeviceModel = mongoose.model("deviceSetup", deviceSchema);
exports.DeviceModel = DeviceModel;

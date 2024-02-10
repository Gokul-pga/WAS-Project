const express = require("express");
const mongoose = require("mongoose");

const device = new mongoose.Schema({
  username: String,
  deviceId: String,
  userId: String,
  location: String,
  status: String,
  sump_vol: String,
  tank_vol: String,
});

const devicedata = mongoose.model("deviceSetup", device);
exports.devicedata = devicedata;

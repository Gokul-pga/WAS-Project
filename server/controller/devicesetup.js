const express = require("express");
const { userAuth } = require("../model/userRegister");
const { devicedata } = require("../model/addDevice");

exports.addDevice = async (req, res) => {
  const { username, deviceId, userId, location, status, sump_vol, tank_vol } =
    req.body;
  const olduser = await userAuth.findOne({ username });
  try {
    if (!olduser) {
      return console.log("user not found");
    }
    await devicedata.create({
      username,
      deviceId,
      userId,
      location,
      status,
      sump_vol,
      tank_vol,
    });
    res.send({ status: "ok", data: req.body });
  } catch (error) {
    console.log(error, "create device error in backend");
  }
};

exports.getdevice = async (req, res) => {
  try {
    const device = await devicedata.find({});
    res.send({ status: "ok", data: device });
  } catch (error) {
    console.log(error, "error from getdevice in backend");
  }
};

exports.deleteDevice = async (req, res) => {
  try {
    const id = req.params.id;
    const device = await devicedata.findById(id);
    await devicedata.deleteOne(device);
    res.send({ status: "deleted" });
  } catch (error) {
    console.log(error, "delete error from deletedevice");
  }
};

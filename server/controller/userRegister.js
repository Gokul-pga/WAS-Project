const express = require("express");
const bcrypt = require("bcrypt");
const { userAuth } = require("../model/userRegister");
const { DeviceModel } = require("../model/addDevice");

exports.userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const encryptpassword = await bcrypt.hash(password, 10);
  const olduser = await userAuth.findOne({ email });
  try {
    if (olduser) {
      return res.send({ status: "ok", data: "user already exists" });
    }
    await userAuth.create({
      username,
      email,
      password: encryptpassword,
    });
    res.send({ status: "ok", data: req.body });
  } catch (error) {
    console.log(error, "user login error");
  }
};

exports.getUser = async (req, res) => {
  try {
    const allData = await userAuth.find({});
    res.send({ status: "ok", data: allData });
  } catch (error) {
    console.log(error, "Get User details error");
  }
};

exports.deleteuser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userAuth.findById(id);
    await userAuth.deleteOne(data);
    const deviceData = await DeviceModel.findById(id);
    await DeviceModel.deleteOne(deviceData);
    res.send({ status: "deleted" });
  } catch (error) {
    console.log(error, "delete user error in backend");
  }
};

exports.deleteuser = async (req, res) => {
  try {
    const id = req.params.id;

    // Delete the user
    await userAuth.findByIdAndDelete(id);

    // Delete the associated device
    await DeviceModel.findOneAndDelete({ userId: id });

    res.send({ status: "deleted" });
  } catch (error) {
    console.log(error, "delete user error in backend");
    res.status(500).send({ status: "Error", error: error.message });
  }
};

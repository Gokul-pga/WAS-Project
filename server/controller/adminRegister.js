const express = require("express");
const bcrypt = require("bcrypt");
const { adminAuth } = require("../model/adminRegister");

exports.adminRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const encryptpassword = await bcrypt.hash(password, 10);
  const olduser = await adminAuth.findOne({ email });
  try {
    if (olduser) {
      return console.log("Admin already exists");
    }
    await adminAuth.create({
      username,
      email,
      password: encryptpassword,
    });
    res.send({ status: "ok", data: req.body });
  } catch (error) {
    console.log(error, "admin register error");
  }
};

exports.getAdmin = async (req, res) => {
  try {
    const allData = await adminAuth.find({});
    res.send({ status: "ok", data: allData });
  } catch (error) {
    console.log(error, "Get Admin details error");
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id; // Corrected
    const data = await adminAuth.findById(id);
    if (!data) {
      return res.status(404).send({ error: "Admin not found" });
    }
    await adminAuth.deleteOne({ _id: id }); // Corrected
    res.send({ status: "deleted" });
  } catch (error) {
    console.error("Delete admin error:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

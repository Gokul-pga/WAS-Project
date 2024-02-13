const { userAuth } = require("../model/userRegister");
const { DeviceModel } = require("../model/addDevice");

exports.addDevice = async (req, res) => {
  const {
    email,
    username,
    devicename,
    userId,
    location,
    status,
    sump_vol,
    tank_vol,
  } = req.body;

  try {
    // Check if the user exists
    const olduser = await userAuth.findOne({ username });
    if (!olduser) {
      return res.send({ status: "User Not Match" });
    }

    // Find the device document for the given user
    let deviceDoc = await DeviceModel.findOne({ username });

    if (!deviceDoc) {
      // If the user doesn't have a device document, create a new one
      deviceDoc = new DeviceModel({
        username,
        userId,
        email,
        devices: [], // Initialize devices array
      });
    }

    // Add the new device to the devices array
    deviceDoc.devices.push({
      username,
      devicename,
      userId,
      location,
      status,
      sump_vol,
      tank_vol,
    });

    // Save the updated document
    await deviceDoc.save();

    console.log("Device added successfully");
    res.send({ status: "ok", data: req.body });
  } catch (error) {
    console.error("Error creating device:", error);
    res.status(500).send({ status: "Error", error: error.message });
  }
};

exports.getdevice = async (req, res) => {
  try {
    const device = await DeviceModel.find({});
    res.send({ status: "ok", data: device });
  } catch (error) {
    console.log(error, "error from getdevice in backend");
  }
};

exports.deleteDevice = async (req, res) => {
  try {
    const id = req.params.id;
    const device = await DeviceModel.findById(id);
    await devicedata.deleteOne(device);
    res.send({ status: "deleted" });
  } catch (error) {
    console.log(error, "delete error from deletedevice");
  }
};

exports.getDevicesForUser = async (req, res) => {
  const { username } = req.body;

  try {
    // Find the device document for the given user
    const deviceDoc = await DeviceModel.findOne({ username });

    if (!deviceDoc) {
      return res.send({ status: "No devices found for the user" });
    }

    // Extract devices array from the document
    const devices = deviceDoc.devices;

    res.send({ status: "ok", data: devices });
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).send({ status: "Error", error: error.message });
  }
};

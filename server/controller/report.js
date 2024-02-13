const { DeviceModel } = require("../model/addDevice");
const { reportData } = require("../model/report");

exports.addReport = async (req, res) => {
  const {
    username,
    devicename,
    sump_state,
    tank_state,
    sump_duration,
    tank_duration,
  } = req.body;

  try {
    // Find the user
    const userDoc = await DeviceModel.findOne({ username });
    if (!userDoc) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    // Find the device within the user's devices
    const device = await userDoc.devices.find(
      (device) => device.devicename === devicename
    );
    if (!device) {
      return res
        .status(404)
        .json({ status: "error", error: "Device not found" });
    }

    // Create a report for the device
    await reportData.create({
      username,
      devicename,
      sump_state,
      tank_state,
      sump_duration,
      tank_duration,
    });

    res.send({ status: "ok", data: req.body });
  } catch (error) {
    console.error("Add report error in Backend:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

exports.getReport = async (req, res) => {
  try {
    const device = await reportData.find({});
    res.send({ status: "ok", data: device });
  } catch (error) {
    console.log(error, "error from getdevice in backend");
  }
};

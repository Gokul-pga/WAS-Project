const { DeviceModel } = require("../model/addDevice");
const { alertData } = require("../model/alert");

exports.addAlert = async (req, res) => {
  const { username, devicename, sump_state, tank_state, pH_value } = req.body;

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
        .json({ status: "error", error: "Device does not match" });
    }

    // Create a report for the device
    await alertData.create({
      username,
      devicename,
      sump_state,
      tank_state,
      pH_value,
    });

    res.send({ status: "ok", data: req.body });
  } catch (error) {
    console.error("Add report error in Backend:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

// exports.getReport = async (req, res) => {
//   try {
//     const username = req.params.username;
//     const device = await reportData.find({ username });
//     res.send({ status: "getReport", data: device });
//   } catch (error) {
//     console.log(error, "error from getdevice in backend");
//   }
// };

exports.getAllAlert = async (req, res) => {
  try {
    const allData = await alertData.find({});
    res.send({ status: "getAllReport", data: allData });
  } catch (error) {
    console.log(error, "Get User device error");
  }
};

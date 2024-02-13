const express = require("express");
const { addReport, getReport, getAllReport } = require("../controller/report");
const { reportData } = require("../model/report");
const router = express.Router();

router.post("/addreport", addReport);
// router.get("/:username", getReport);
router.get("/getallreport", getAllReport);

router.get('/getReport/:username', async (req, res) => {
    try {
      const username = req.params.username;
  
      // Use the aggregate function to filter devices based on the username
      const devices = await reportData.aggregate([
        {
          $match: {
            'devices.username': username,
          },
        },
        {
          $project: {
            _id: 1,
            username: '$devices.username',
            devicename: '$devices.devicename',
            location: '$devices.location',
            status: '$devices.status',
            sump_vol: '$devices.sump_vol',
            tank_vol: '$devices.tank_vol',
          },
        },
      ]);
  
      res.send({ status: 'getReport', data: devices });
    } catch (error) {
      console.log(error, 'error from getReport in backend');
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
  });

module.exports = router;

const express = require("express");
const { addReport, getReport } = require("../controller/report");
const router = express.Router();

router.post("/addreport", addReport);
router.get("/getreport", getReport);


module.exports = router;

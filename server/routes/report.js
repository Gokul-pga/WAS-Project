const express = require("express");
const { addReport, getreport } = require("../controller/report");
const router = express.Router();

router.post("/addreport", addReport);
router.get("/getreport", getreport);

module.exports = router;

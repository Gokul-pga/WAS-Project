const express = require("express");
const { addReport, getReport, getAllReport } = require("../controller/report");
const router = express.Router();

router.post("/addreport", addReport);
// router.get("/:username", getReport);
router.get("/getallreport", getAllReport);

module.exports = router;

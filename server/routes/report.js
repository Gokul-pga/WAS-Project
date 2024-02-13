const express = require("express");
const { addReport, getAllReport } = require("../controller/report");
const router = express.Router();

router.post("/addreport", addReport);
router.get("/getallreport", getAllReport);

module.exports = router;

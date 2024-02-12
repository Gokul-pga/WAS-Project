const express = require("express");
const { addReport } = require("../controller/report");
const router = express.Router();

router.post("/addReport", addReport);

module.exports = router;

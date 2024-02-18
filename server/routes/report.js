const express = require("express");
const { addReport, getAllReport } = require("../controller/report");
const router = express.Router();

router.post("/addReport", addReport);
router.get("/getAllReport", getAllReport);
module.exports = router;

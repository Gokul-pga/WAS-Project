const express = require("express");
const { addAlert, getAllAlert } = require("../controller/alert");
const router = express.Router();

router.post("/addAlert", addAlert);
router.get("/getallalert", getAllAlert);

module.exports = router;

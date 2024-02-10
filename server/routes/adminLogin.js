const express = require("express");
const { adminLogin, authentication } = require("../controller/adminLogin");
const router = express.Router();

router.post("/adminLogin", adminLogin);
router.post("/userdata", authentication);

module.exports = router;

const express = require("express");
const { userLogin, authentication } = require("../controller/userLogin");
const router = express.Router();

router.post("/userlogin", userLogin);
router.post("/userdata", authentication);

module.exports = router;

const express = require("express");
const { userLogin } = require("../controller/userLogin");
const router = express.Router();

router.post("/userlogin", userLogin);

module.exports = router;

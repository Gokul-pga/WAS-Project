const express = require("express");
const { userLogin } = require("../controller/userLogin");
const router = express.Router();

router.post("/userLogin",userLogin);

module.exports = router;
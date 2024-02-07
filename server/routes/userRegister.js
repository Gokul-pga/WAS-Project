const express = require("express");
const {  getUser, userRegister } = require("../controller/userRegister");
const router = express.Router();

router.post('/adduser',userRegister)
router.get('/getuser',getUser)


module.exports = router;
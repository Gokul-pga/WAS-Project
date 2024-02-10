const express = require("express");
const {
  getUser,
  userRegister,
  deleteuser,
} = require("../controller/userRegister");
const { addDevice } = require("../controller/devicesetup");
const router = express.Router();

router.post("/adduser", userRegister);
router.get("/getuser", getUser);
router.delete("/:id", deleteuser);
router.post("/addDevice", addDevice);

module.exports = router;

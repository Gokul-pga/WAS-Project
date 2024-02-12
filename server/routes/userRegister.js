const express = require("express");
const {
  getUser,
  userRegister,
  deleteuser,
} = require("../controller/userRegister");
const router = express.Router();

router.post("/adduser", userRegister);
router.get("/getuser", getUser);
router.delete("/:id", deleteuser);

module.exports = router;

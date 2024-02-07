const express = require("express");
const { adminRegister, getAdmin, deleteAdmin } = require("../controller/adminRegister");
const router = express.Router();

router.post('/add',adminRegister)
router.get("/get",getAdmin)
router.delete("/:id", deleteAdmin)

module.exports = router;
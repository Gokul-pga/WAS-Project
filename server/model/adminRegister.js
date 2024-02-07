const mongoose = require("mongoose")

const adminsignup = new mongoose.Schema(
    {
        username:String,
        email: {type: String,unique: true},
        password:String
    })

const adminAuth = mongoose.model("adminAuthAccount",adminsignup);
exports.adminAuth = adminAuth;
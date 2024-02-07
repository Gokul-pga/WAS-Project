const mongoose = require("mongoose")

const usersignup = new mongoose.Schema(
    {
        username:String,
        email: {type: String,unique: true},
        password:String
    })

const userAuth = mongoose.model("userAuthAccount",usersignup);
exports.userAuth = userAuth;
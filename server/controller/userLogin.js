const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../model/userRegister");


const secret_key = process.env.JWT_SECRET

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userAuth.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }
        if (bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email: user.email }, secret_key);
            return res.status(200).json({ status: "ok", data: token });
        }


    } catch (error) {
        console.error("user login error:", error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};
const { adminAuth } = require("../model/adminRegister");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const secret_key = process.env.JWT_SECRET

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await adminAuth.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "error", error: "admin not found" });
        }
        if (bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email: user.email }, secret_key);
            return res.status(200).json({ status: "ok", data: token });
        }


    } catch (error) {
        console.error("Admin login error:", error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};
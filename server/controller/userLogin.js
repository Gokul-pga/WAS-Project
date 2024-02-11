const { userAuth } = require("../model/userRegister");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret_key = process.env.JWT_SECRET;

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userAuth.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ email: user.email }, secret_key);
      return res.status(200).json({ status: "ok", data: token });
    } else {
      // Passwords don't match
      return res
        .status(401)
        .json({ status: "error", error: "Incorrect password" });
    }
  } catch (error) {
    console.error("User login error:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

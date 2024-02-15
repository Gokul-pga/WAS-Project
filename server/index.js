const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();

const adminRegister = require("./routes/adminRegister.js");
const adminLogin = require("./routes/adminLogin.js");
const userRegister = require("./routes/userRegister.js");
const addDevice = require("./routes/addDevice.js");
const userLogin = require("./routes/userLogin.js");
const deviceShow = require("./routes/report.js");

// //server setup and connect
//const port = process.env.PORT ;
app.listen(5000, () => {
  console.log("Server connected");
});

// //Mongodb database setup and connect
const MONGOURL = process.env.MONGODB;
mongoose.connect(MONGOURL).then(console.log("Database connected"));

// admin register and login api
app.use("/jwt", adminRegister);
app.use("/jwt", adminLogin);

// user register and login api
app.use("/userjwt", userRegister);
app.use("/userjwt", userLogin);

//create device based on user created
app.use("/postdevice", addDevice);

//crearte for report and alert analysis
app.use("/deviceshow", deviceShow);

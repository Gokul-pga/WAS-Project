import { postdevice } from "@/envfile/auth";
import toast from "react-hot-toast";

export const addDevice = async (
  username,
  devicename,
  location,
  devicestatus,
  sumpvol,
  tankvol,
  userId
) => {
  try {
    await fetch(postdevice + "/addDevice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        devicename,
        location,
        status: devicestatus,
        sump_vol: sumpvol,
        tank_vol: tankvol,
        userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          toast.success("Device Created");
        }
        if (data.status == "User Not Match") {
          toast.error("User Not Match");
        }
      });
  } catch (error) {
    console.log(error, "device data send to database error");
  }
};

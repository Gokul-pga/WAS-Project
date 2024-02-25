import { deviceshow } from "@/envfile/auth";
import toast from "react-hot-toast";

export const addAlert = async (
  username,
  devicename,
  sump_state,
  tank_state,
  pH_value
) => {
  try {
    await fetch(deviceshow + "/addAlert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        devicename,
        sump_state,
        tank_state,
        pH_value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          toast.success("Alert Created");
        }
        if (data.status == "User not found") {
          toast.error("Username Not Match");
        }
        if (data.status == "Device not found") {
          toast.error("Devicename Not Match");
        }
      });
  } catch (error) {
    console.log(error, "Report data send to database error");
  }
};

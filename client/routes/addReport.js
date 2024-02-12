import toast from "react-hot-toast";

export const addReport = async (
  username,
  devicename,
  sump_state,
  tank_state,
  sump_duration,
  tank_duration
) => {
  try {
    await fetch("http://localhost:5000/deviceshow" + "/addreport", {
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
        sump_duration,
        tank_duration,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          toast.success("Report Created");
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

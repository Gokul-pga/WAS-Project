import { jwt } from "@/envfile/auth";
import toast from "react-hot-toast";

export const admincreateaccount = async (username, email, password) => {
  try {
    await fetch(jwt + "/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "admin registried");
        if (data.status == "ok") {
          toast.success("Account created");
        }
      });
  } catch (error) {
    console.log(error, "admin account create error");
  }
};

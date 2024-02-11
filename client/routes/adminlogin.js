import toast from "react-hot-toast";

export const adminLoginAccount = async (adminemail, adminpassword) => {
  try {
    await fetch("http://localhost:5000/jwt" + "/adminLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: adminemail,
        password: adminpassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("admin logined successfully");
        if (data.status == "ok") {
          toast.success(" logined successfully");
          window.location.href = "/admin/adminpg";
        }
        window.localStorage.setItem("Token", data.data);
        typeof window !== "undefined" &&
          window.localStorage.setItem("userDetails", JSON.stringify(data.data));
      });
  } catch (error) {
    console.log(error, "user login error");
  }
};

import toast from "react-hot-toast";

export const userLoginAccount = async (email, password) => {
  try {
    await fetch("http://localhost:5000/userjwt" + "/userlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("user logined successfully");
        if (data.status == "ok") {
          toast.success(" logined successfully");
        }
        window.localStorage.setItem("Token", data.data);
        typeof window !== "undefined" &&
          window.localStorage.setItem(
            "userLogindetails",
            JSON.stringify(data.data)
          );
      });
  } catch (error) {
    console.log(error, "user login error");
  }
};

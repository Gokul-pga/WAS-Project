import UserDashboardNavbar from "@/components/UserDashvboardNavbar";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [userDatas, setuserDatas] = useState("");
  const collectData = async () => {
    try {
      await fetch("http://localhost:5000/userjwt" + "/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("Token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setuserDatas(data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    collectData();
  }, [])
  
  return (
    <>
      <div className="text-black flex flex-row w-full h-[100vh]">
        <div className="flex flex-row w-[25%]">
          <UserDashboardNavbar />
        </div>
        <div className="flex flex-col w-[75%] ">
          <div className="bg-sky-400 flex flex-row w-full px-5 py-3 justify-center text-xl font-semibold">
            Dashboard
          </div>
          <div className="flex flex-col w-full h-[100vh] items-center justify-center text-2xl">
            content
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

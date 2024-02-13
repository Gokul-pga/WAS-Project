import UserDashboardNavbar from "@/components/UserDashvboardNavbar";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

function Dashboard() {
  const [userDatas, setuserDatas] = useState("");
  const collectData = async () => {
    try {
      await fetch("http://localhost:5000/userjwt" + "/userdata", {
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

  typeof window !== "undefined" &&
    window.localStorage.setItem("userLogindetails", JSON.stringify(userDatas));

  const windows =
    typeof window !== "undefined" &&
    window.localStorage.getItem("userLogindetails");
  const fetchDetails = JSON.parse(windows);

  useEffect(() => {
    collectData();
  }, []);

  return (
    <>
      <div className="text-black flex flex-row w-full h-[100vh]">
        <div className="flex flex-row w-[25%]">
          <UserDashboardNavbar />
        </div>
        <div className="flex flex-col w-[75%] ">
          <div className="bg-sky-400 flex flex-col w-full gap-3 px-5 py-3 justify-center text-lg text-white ">
            <div className="flex flex-row gap-2">
              <div className="flex flex-row gap-1 items-center">
                <div>
                  <FaRegUserCircle />
                </div>
                <div className="font-semibold">Username :</div>
              </div>
              <div>{fetchDetails.username}</div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row gap-1 items-center">
                <div>
                  <MdOutlineMailOutline />
                </div>
                <div className="font-semibold">Email :</div>
              </div>
              <div>{fetchDetails.email}</div>
            </div>
          </div>
          <div className="flex flex-col w-full h-[100vh] items-center justify-center text-2xl">
            {fetchDetails.username}
            {fetchDetails.email}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

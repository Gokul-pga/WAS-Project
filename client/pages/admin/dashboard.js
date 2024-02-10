import DashboardNavbar from "@/components/DashboardNavbar";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete, MdDevices } from "react-icons/md";

function AdminDashboard() {
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const getUserDetails = async () => {
    try {
      await fetch("http://localhost:5000/postdevice" + "/getDevice", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => setUserDetails(data.data));
    } catch (error) {
      console.log(error, "get user details error");
    }
  };
  useEffect(() => {
    getUserDetails();
  }, [userDetails]);

  return (
    <>
      <div className="text-black flex flex-row w-full h-[100vh]">
        <div className="flex flex-row w-[25%]">
          <DashboardNavbar />
        </div>
        <div className="flex flex-col w-[75%] ">
          <div className="bg-sky-400 flex flex-row w-full px-5 py-3 justify-center text-xl font-semibold">
            Dashboard
          </div>
          <div className="flex flex-wrap gap-5 w-[100%]  bg-white p-5">
            {userDetails.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex  flex-col w-[45%] items-center px-5 py-3 bg-gray-300 gap-5  rounded-md justify-between"
                >
                  <div className="flex-flex-col gap-5">
                    <div className="pb-2 flex flex-row gap-2">
                      <div className="font-bold">Username:</div>{" "}
                      <div className="font-semibold">{item.username}</div>
                    </div>
                    <div className=" flex flex-row gap-2">
                      <div className="font-bold">Email:</div>{" "}
                      <div className="font-semibold">{item.userId}</div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-around w-full">
                    <button
                      onClick={() => {
                        const id = item._id;
                        console.log(id);
                        deleteuser(id);
                      }}
                    >
                      <MdDelete className="text-2xl text-red-500" />
                    </button>
                    <button>
                      <FaUserEdit className="text-2xl text-red-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;

import DashboardNavbar from "@/components/DashboardNavbar";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete, MdDevices } from "react-icons/md";
import Deviceshow from "./deviceshow";

function AdminDashboard() {
  const [show, setShow] = useState(true);
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
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
          {show ? (
            <div className="flex flex-wrap gap-5 w-[100%]  bg-white p-5">
              {userDetails.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      const id = item._id;
                      console.log(id);
                      setId(id);
                      const username = item.username;
                      console.log(username);
                      setUsername(username);
                      setShow(false);
                    }}
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
                        <div className="font-semibold">{item.email}</div>
                      </div>
                      <div className=" flex flex-row gap-2">
                        <div className="font-bold">UserId:</div>{" "}
                        <div className="font-semibold">{item.userId}</div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-around w-full">
                      <button>
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
          ) : (
            <Deviceshow
              username={username}
              id={id}
              setId={setId}
              show={show}
              setShow={setShow}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;

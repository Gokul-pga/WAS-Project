import UserDashboardNavbar from "@/components/UserDashvboardNavbar";
import { postdevice, userjwt } from "@/envfile/auth";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineDevices } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { PiToggleRightFill } from "react-icons/pi";
import { PiToggleLeftFill } from "react-icons/pi";
import { FaThermometerEmpty } from "react-icons/fa";
import { FaThermometerFull } from "react-icons/fa";

function Dashboard() {
  const [userDatas, setuserDatas] = useState("");
  const [username, setUsername] = useState("");
  const collectData = async () => {
    try {
      await fetch(userjwt + "/userdata", {
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

  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetchData();
    collectData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(postdevice + "/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "ok") {
        console.log("Device data Fetched successfully");
        setDevices(data.data, "device data from db");
      } else {
        console.error("Error fetching devices:", data.error);
      }
    } catch (error) {
      console.error("Error fetching devices:", error.message);
    }
  };

  typeof window !== "undefined" &&
    window.localStorage.setItem("userLogindetails", JSON.stringify(userDatas));

  const windows =
    typeof window !== "undefined" &&
    window.localStorage.getItem("userLogindetails");
  const fetchDetails = JSON.parse(windows);
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
          <div className="flex flex-col gap-3">
            <div className="flex flex-row  w-full ">
              {devices
                .filter((item) => item.username === fetchDetails.username)
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex  flex-col items-center px-5 py-3   rounded-md justify-between"
                    >
                      <div className="flex flex-col justify-around w-full">
                        {item.devices.map((data, dataIndex) => (
                          <div key={dataIndex} className="gap-1 flex flex-col">
                            <div className="flex flex-row gap-2">
                              <div className="flex flex-row gap-2 items-center">
                                <div>
                                  <MdOutlineDevices className="text-xl text-blue-500" />
                                </div>
                                <div className="font-semibold">DeviceId:</div>
                              </div>
                              <div>{data.devicename}</div>
                            </div>
                            <div className="flex flex-row gap-2">
                              <div className="flex flex-row gap-2 items-center">
                                <div>
                                  <IoLocationSharp className="text-xl text-green-400" />
                                </div>
                                <div className="font-semibold">Location:</div>
                              </div>
                              <div>{data.location}</div>
                            </div>
                            <div className="flex flex-row gap-2 ">
                              <div className="flex flex-row gap-2 items-center">
                                <div>
                                  {data.status === "Active" ? (
                                    <PiToggleRightFill className="text-green-400 text-xl" />
                                  ) : (
                                    /* You can use another icon or leave it empty based on your preference */
                                    <PiToggleLeftFill className="text-red-400 text-xl" />
                                  )}
                                </div>
                                <div className="font-semibold">Status:</div>
                              </div>
                              <div>{data.status}</div>
                            </div>
                            <div className="flex flex-row gap-2 ">
                              <div className="flex flex-row gap-2 items-center">
                                <div>
                                  <FaThermometerFull className="text-xl text-gray-400" />
                                </div>
                                <div className="font-semibold">Sump - Vol:</div>
                              </div>
                              <div>{data.sump_vol}</div>
                            </div>
                            <div className="flex flex-row gap-2 pb-5">
                              <div className="flex flex-row gap-2 items-center">
                                <div>
                                  <FaThermometerEmpty className="text-xl" />
                                </div>
                                <div className="font-semibold">Tank - Vol:</div>
                              </div>
                              <div>{data.tank_vol}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

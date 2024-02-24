import React, { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { postdevice } from "@/envfile/auth";
import { MdOutlineDevices } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { PiToggleRightFill } from "react-icons/pi";
import { PiToggleLeftFill } from "react-icons/pi";
import { FaThermometerEmpty } from "react-icons/fa";
import { FaThermometerFull } from "react-icons/fa";
import AlertForm from "./alertForm";
import ReportForm from "./reportform";

function Deviceshow({ setShow, show, username, id, setId }) {
  const [devices, setDevices] = useState([]);
  const [reportForm, setReportForm] = useState(false);
  const [alertForm, setAlertForm] = useState(false);

  useEffect(() => {
    fetchData();
    console.log(id, "device id");
  }, [username]);

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

  return (
    <>
      <div className="flex flex-col gap-5 w-[100%] h-[80vh] ">
        <div className="flex flex-row p-3 h-16 w-[100%] justify-between items-center">
          <IoArrowBackSharp
            className="text-2xl cursor-pointer"
            onClick={() => {
              setShow(true);
            }}
          />
          <div className="flex flex-row gap-3">
            <button
              onClick={() => {
                setAlertForm(true);
              }}
              className="px-5 py-2 bg-gray-200 text-red-600 font-bold"
            >
              Alert Create
            </button>
            {alertForm && (
              <AlertForm
                username={username}
                alertForm={alertForm}
                setAlertForm={setAlertForm}
                id={id}
              />
            )}
            <button
              onClick={() => {
                setReportForm(true);
                console.log("open");
              }}
              className="px-5 py-2 bg-gray-200 text-red-600 font-bold"
            >
              Report Create
            </button>
            {reportForm && (
              <ReportForm
                username={username}
                setReportForm={setReportForm}
                reportForm={reportForm}
                id={id}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-row pl-5">
            {devices
              .filter((item) => item.username === username)
              .map((item, index) => (
                <div key={index} className="flex  flex-col  ">
                  <div className=" px-4 py-1 rounded-md hover:scale-105 cursor-pointer transition-all flex flex-row gap-2 border-2 border-gray-400 items-center">
                    <div className="font-bold">Username:</div>
                    <div className="font-semibold">{item.username}</div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex flex-row  w-full h-96">
            {devices
              .filter((item) => item.username === username)
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
    </>
  );
}

export default Deviceshow;

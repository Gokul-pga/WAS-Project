import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import ReportForm from "./reportform";

function Deviceshow({ setShow, show, username, id, setId }) {
  const [devices, setDevices] = useState([]);
  const [reportForm, setReportForm] = useState(false);
  console.log(username, "USERNAME");

  useEffect(() => {
    fetchData();
    console.log(id, "device id");
  }, [username]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/deviceshow" + `/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // Check if the response status is OK (200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response as JSON
      const data = await response.json();

      // Check if the response contains the expected data structure
      if (data.status === "ok") {
        console.log("Device data Fetched successfully");
        setDevices(data.data);
      } else {
        console.error("Error fetching devices:", data.error);
      }
    } catch (error) {
      console.error("Error fetching devices:", error.message);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-5 w-[100%] h-[100vh] ">
        <div className="flex flex-row p-3 h-16 w-[100%]   justify-between items-center">
          <IoArrowBackSharp
            className="text-2xl"
            onClick={() => {
              setShow(true);
            }}
          />
          <button
            onClick={() => {
              setReportForm(true);
            }}
            className="px-5 py-2 bg-gray-200 text-red-600 font-bold"
          >
            Report Create
          </button>
        </div>
        {reportForm && (
          <ReportForm
            username={username}
            setReportForm={setReportForm}
            reportForm={reportForm}
            id={id}
          />
        )}

        <div className="flex flex-row h-40">
          {devices.map((item, index) => (
            <div
              key={index}
              className="flex  flex-col w-[45%] bg-green-400 items-center px-5 py-3   rounded-md justify-between"
            >
              <div className="flex-flex-col gap-5 ">
                <div className="pb-2 flex flex-row gap-2">
                  <div className="font-bold">Username:</div>{" "}
                  <div className="font-semibold">{item.username}</div>
                </div>
                <div className=" flex flex-row gap-2">
                  <div className="font-bold">Email:</div>{" "}
                  <div className="font-semibold">{item.devicename}</div>
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
          ))}
        </div>
      </div>
    </>
  );
}

export default Deviceshow;

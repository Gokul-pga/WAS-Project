import UserDashboardNavbar from "@/components/UserDashvboardNavbar";
import React, { useEffect, useState } from "react";
import { deviceshow, postdevice } from "@/envfile/auth";

function Alert() {
  const [getLocation, setGetLocation] = useState([]);

  const [userDetails, setUserDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState("");

  const getUserDetails = async () => {
    try {
      await fetch(deviceshow + "/getallalert", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserDetails(data.data);
          console.log(data.data);
        });
    } catch (error) {
      console.log(error, "get user details error");
    }
  };
  const windows =
    typeof window !== "undefined" &&
    window.localStorage.getItem("userLogindetails");
  const fetchDetails = JSON.parse(windows);
  useEffect(() => {
    fetchData();
    getUserDetails();
    const windows =
      typeof window !== "undefined" &&
      window.localStorage.getItem("userLogindetails");
    const fetchDetails = JSON.parse(windows);
    setUserName(fetchDetails.username);
  }, []);

  const filteredUserDetails = userDetails.filter(
    (report) => report.username === userName
  );

  const tankStateColors = {
    High: "green",
    Low: "red",
    Medium: "orange",
    // Add more states as needed
  };
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterDevice = () => {
    return filteredUserDetails.filter((device) =>
      device.devicename.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const fetchData = async () => {
    try {
      const response = await fetch(postdevice + "/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setGetLocation(data.data);
          console.log(data.data, "Get location");
        });

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
      <div className="text-black flex flex-row w-full h-[100vh]">
        <div className="flex flex-row w-[25%]">
          <UserDashboardNavbar />
        </div>
        <div className="flex flex-col w-[75%] ">
          <div className="bg-black text-white flex flex-row tracking-wider  w-full px-5 py-3 justify-center text-xl font-bold">
            Alert Data
          </div>
          <div className="flex flex-col w-full h-[100vh] p-5  text-lg">
            <div className="p-2 mb-5 flex flex-row gap-5">
              <input
                placeholder="Search Username"
                className="px-3 py-2 bg-gray-200"
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />
              {/* <input
                placeholder="Search DeviceId"
                className="px-3 py-2 bg-gray-200"
                value={deviceQuery}
                onChange={handledeviceidChange}
              />
              <input
                placeholder="Search Location"
                className="px-3 py-2 bg-gray-200"
                value={locationQuery}
                onChange={handleLocationChange}
              />

              <input
                placeholder="Search Date DD/MM/YYYY"
                className="px-3 py-2 bg-gray-200"
                value={dateQuery}
                type="text"
                onChange={handleDateChange}
              /> */}
            </div>
            {searchQuery.length >= 1 ? (
              <table className="table-auto w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">S:No</th>
                    <th className="px-4 py-2">Username</th>
                    <th className="px-4 py-2">DeviceId</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Sump State</th>
                    <th className="px-4 py-2">Tank State</th>
                    <th className="px-4 py-2">pH Value</th>
                    <th className="px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filterDevice().map((report, index) => (
                    <tr
                      key={report._id}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="border px-4 py-2">{index + 1}</td>

                      <td className="border px-4 py-2">{report.username}</td>
                      <td className="border px-4 py-2">{report.devicename}</td>
                      <td
                        className="border px-4 py-2 font-semibold"
                        style={{
                          color: tankStateColors[report.sump_state] || "black",
                        }}
                      >
                        {report.sump_state}
                      </td>
                      <td
                        className="border px-4 py-2 font-semibold"
                        style={{
                          color: tankStateColors[report.tank_state] || "black",
                        }}
                      >
                        {report.tank_state}
                      </td>
                      <td className="border px-4 py-2">
                        {report.sump_duration}
                      </td>
                      <td className="border px-4 py-2">
                        {report.tank_duration}
                      </td>
                      <td className="border px-4 py-2">{report.pH_value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="table-auto w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">S:No</th>
                    <th className="px-4 py-2">Username</th>
                    <th className="px-4 py-2">DeviceId</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Sump State</th>
                    <th className="px-4 py-2">Tank State</th>
                    <th className="px-4 py-2">pH Value</th>
                    <th className="px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filterDevice().map((report, index) => (
                    <tr
                      key={report._id}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="border px-4 py-2">{index + 1}</td>

                      <td className="border px-4 py-2">{report.username}</td>
                      <td className="border px-4 py-2">{report.devicename}</td>

                      {getLocation
                        .filter((item) => item.username === report.username)
                        .map((data) =>
                          data.devices
                            .filter(
                              (item) => item.devicename === report.devicename
                            )
                            .map((deviceData, id) => (
                              <td key={id} className="border px-4 py-2">
                                {deviceData.location}
                              </td>
                            ))
                        )}
                      <td
                        className="border px-4 py-2 font-semibold"
                        style={{
                          color: tankStateColors[report.sump_state] || "black",
                        }}
                      >
                        {report.sump_state}
                      </td>
                      <td
                        className="border px-4 py-2 font-semibold"
                        style={{
                          color: tankStateColors[report.tank_state] || "black",
                        }}
                      >
                        {report.tank_state}
                      </td>
                      <td className="border px-4 py-2">{report.pH_value}</td>
                      <td className="border px-4 py-2">
                        {new Date(report.date).toLocaleDateString()}{" "}
                        {/* Display Date */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Alert;

import DashboardNavbar from "@/components/DashboardNavbar";
import { deviceshow, postdevice } from "@/envfile/auth";
import React, { useEffect, useState } from "react";

function Report() {
  //fetch userdetails from database
  const [userDetails, setUserDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateQuery, setDateQuery] = useState("");
  const [deviceQuery, setDeviceQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [getLocation, setGetLocation] = useState([]);

  const getUserDetails = async () => {
    try {
      await fetch(deviceshow + "/getAllReport", {
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

  useEffect(() => {
    getUserDetails();
    fetchData();
  }, []);

  //get location from devicesetup function
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

  const handleUsernameChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocationQuery(event.target.value);
  };

  const handleDeviceIdChange = (event) => {
    setDeviceQuery(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateQuery(event.target.value);
  };

  const filterReports = () => {
    return userDetails.filter((report) => {
      const usernameMatch = report.username
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const deviceMatch = report.devicename
        .toLowerCase()
        .includes(deviceQuery.toLowerCase());

      const locationMatch = getLocation
        .filter((item) => item.username === report.username)
        .some((data) =>
          data.devices.some(
            (deviceData) =>
              deviceData.devicename === report.devicename &&
              deviceData.location
                .toLowerCase()
                .includes(locationQuery.toLowerCase())
          )
        );

      const dateMatch = new Date(report.date)
        .toLocaleDateString()
        .includes(dateQuery);

      return usernameMatch && deviceMatch && locationMatch && dateMatch;
    });
  };

  return (
    <>
      <div className="text-black flex flex-row w-full h-[100vh]">
        <div className="flex flex-row w-[25%]">
          <DashboardNavbar />
        </div>
        <div className="flex flex-col w-[75%] ">
          <div className="bg-black text-white flex flex-row tracking-wider  w-full px-5 py-3 justify-center text-xl font-bold">
            Report Data
          </div>
          <div className="flex flex-col w-full h-[100vh] p-5  text-md">
            <div className="p-2 mb-5 flex flex-row gap-5 justify-between">
              <input
                placeholder="Search Username"
                className="px-3 py-2 bg-gray-200"
                value={searchQuery}
                onChange={handleUsernameChange}
              />
              <input
                placeholder="Search DeviceId"
                className="px-3 py-2 bg-gray-200"
                value={deviceQuery}
                onChange={handleDeviceIdChange}
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
                onChange={handleDateChange}
              />
            </div>
            {searchQuery ||
            dateQuery ||
            locationQuery ||
            deviceQuery.length >= 1 ? (
              <table className="table-auto w-full">
                <thead className="bg-gray-200">
                  <tr>
                    {" "}
                    <th className="px-4 py-2">S:No</th>
                    <th className="px-4 py-2">Username</th>
                    <th className="px-4 py-2">DeviceId</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Sump Volume</th>
                    <th className="px-4 py-2">Tank Volume</th>
                    <th className="px-4 py-2">Sump value</th>
                    <th className="px-4 py-2">Tank value</th>
                    <th className="px-4 py-2">Sump Duration</th>
                    <th className="px-4 py-2">Tank Duration</th>
                    <th className="px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filterReports().map((report, index) => (
                    <tr
                      key={report._id}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      {" "}
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
                              // Render each device data here
                              <React.Fragment key={id}>
                                <td className="border px-4 py-2">
                                  {deviceData.location}
                                </td>
                                <td className="border px-4 py-2">
                                  {deviceData.sump_vol}
                                </td>
                                <td className="border px-4 py-2">
                                  {deviceData.tank_vol}
                                </td>
                              </React.Fragment>
                            ))
                        )}
                      <td className="border px-4 py-2">{report.sump_value}</td>
                      <td className="border px-4 py-2">
                        {report.tank_value}
                      </td>{" "}
                      <td className="border px-4 py-2">
                        {report.sump_duration}
                      </td>
                      <td className="border px-4 py-2">
                        {report.tank_duration}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(report.date).toLocaleDateString()}
                      </td>
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
                    <th className="px-4 py-2">Sump Volume</th>
                    <th className="px-4 py-2">Tank Volume</th>
                    <th className="px-4 py-2">Sump value</th>
                    <th className="px-4 py-2">Tank value</th>

                    <th className="px-4 py-2">Sump Duration</th>
                    <th className="px-4 py-2">Tank Duration</th>
                    <th className="px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userDetails.map((report, index) => (
                    <tr
                      key={report._id}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      {" "}
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
                              // Render each device data here
                              <React.Fragment key={id}>
                                <td className="border px-4 py-2">
                                  {deviceData.location}
                                </td>
                                <td className="border px-4 py-2">
                                  {deviceData.sump_vol}
                                </td>
                                <td className="border px-4 py-2">
                                  {deviceData.tank_vol}
                                </td>
                              </React.Fragment>
                            ))
                        )}
                      <td className="border px-4 py-2">{report.sump_value}</td>
                      <td className="border px-4 py-2">
                        {report.tank_value}
                      </td>{" "}
                      <td className="border px-4 py-2">
                        {report.sump_duration}
                      </td>
                      <td className="border px-4 py-2">
                        {report.tank_duration}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(report.date).toLocaleDateString()}
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

export default Report;

import DashboardNavbar from "@/components/DashboardNavbar";
import { deviceshow, postdevice } from "@/envfile/auth";
import React, { useEffect, useState } from "react";

function Alert() {
  //fetch userdetails from database
  const [userDetails, setUserDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateQuery, setDateQuery] = useState("");
  const [deviceQuery, setDeviceQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [getLocation, setGetLocation] = useState([]);

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

  useEffect(() => {
    getUserDetails();
    fetchData();
  }, []);

  const handleUsernameChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateQuery(event.target.value);
  };
  const handledeviceidChange = (evevnt) => {
    setDeviceQuery(evevnt.target.value);
  };
  const handleLocationChange = (event) => {
    setLocationQuery(event.target.value);
  };

  const filterUser = () => {
    return userDetails.filter((user) => {
      const lowercaseUsername =
        user.username && user.username.toLowerCase
          ? user.username.toLowerCase()
          : "";
      const lowercaseDate =
        user.date && user.date.toLocaleDateString
          ? new Date(user.date).toLocaleDateString().toLowerCase()
          : "";
      const lowercasedeviceid =
        user.devicename && user.devicename.toLowerCase
          ? user.devicename.toLowerCase()
          : "";

      const matchingLocationUsers = getLocation.filter(
        (item) => item.username === user.username
      );

      const lowercaseLocation = matchingLocationUsers.reduce((acc, item) => {
        const matchingDevices = item.devices.filter(
          (device) => device.devicename === user.devicename
        );

        const location = matchingDevices.map((device) =>
          device.location && device.location.toLowerCase
            ? device.location.toLowerCase()
            : ""
        );

        return acc.concat(location);
      }, []);

      return (
        lowercaseUsername.includes(searchQuery.toLowerCase()) &&
        lowercaseDate.includes(dateQuery.toLowerCase()) &&
        lowercasedeviceid.includes(deviceQuery.toLowerCase()) &&
        lowercaseLocation.some((location) =>
          location.includes(locationQuery.toLowerCase())
        )
      );
    });
  };

  const tankStateColors = {
    High: "green",
    Low: "red",
    Medium: "orange",
    // Add more states as needed
  };

  const getPhColor = (pH) => {
    const numericPh = parseFloat(pH);

    if (numericPh >= 1 && numericPh <= 3) {
      return "red";
    } else if (numericPh > 3 && numericPh <= 6) {
      return "yellow";
    } else if (numericPh > 6 && numericPh <= 8) {
      return "green";
    } else if (numericPh > 8 && numericPh <= 10) {
      return "blue";
    } else {
      return "purple"; // Default color if pH is out of expected range
    }
  };

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
  return (
    <>
      <div className="text-black flex flex-row w-full h-[100vh]">
        <div className="flex flex-row w-[25%]">
          <DashboardNavbar />
        </div>
        <div className="flex flex-col w-[75%] ">
          <div className="bg-black text-white flex flex-row tracking-wider  w-full px-5 py-3 justify-center text-xl font-bold">
            Alert Data
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
              />
            </div>

            {searchQuery || dateQuery.length >= 3 ? (
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
                  {filterUser().map((report, index) => (
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
                              <td key={id} className="border px-4 py-2">
                                {deviceData.location}
                              </td>
                            ))
                        )}{" "}
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
                      <td
                        className="border px-4 py-2"
                        style={{ color: getPhColor(report.pH_value) }}
                      >
                        {report.pH_value}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(report.date).toLocaleDateString()}{" "}
                        {/* Display Date */}
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
                    <th className="px-4 py-2">Sump State</th>
                    <th className="px-4 py-2">Tank State</th>
                    {/* <th className="px-4 py-2">Sump Duration</th>
                    <th className="px-4 py-2">Tank Duration</th> */}
                    <th className="px-4 py-2">pH Value</th>
                    <th className="px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filterUser().map((report, index) => (
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
                      <td
                        className="border px-4 py-2"
                        style={{ color: getPhColor(report.pH_value) }}
                      >
                        {report.pH_value}
                      </td>
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

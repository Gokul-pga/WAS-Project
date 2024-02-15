import DashboardNavbar from "@/components/DashboardNavbar";
import { deviceshow } from "@/envfile/auth";
import React, { useEffect, useState } from "react";

function Alert() {
  //fetch userdetails from database
  const [userDetails, setUserDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const getUserDetails = async () => {
    try {
      await fetch(deviceshow + "/getallreport", {
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
  }, []);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterUser = () => {
    return userDetails.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const tankStateColors = {
    High: "green",
    Low: "red",
    Medium: "orange",
    // Add more states as needed
  };

  return (
    <>
      <div className="text-black flex flex-row w-full h-[100vh]">
        <div className="flex flex-row w-[25%]">
          <DashboardNavbar />
        </div>
        <div className="flex flex-col w-[75%] ">
          <div className="bg-sky-400 flex flex-row tracking-wider  w-full px-5 py-3 justify-center text-xl font-bold">
            Alert Data
          </div>
          <div className="flex flex-col w-full h-[100vh] p-5  text-lg">
            <div className="p-2 mb-5 flex flex-row gap-5">
              <input
                placeholder="Search Username "
                className="px-3 py-2 bg-gray-200"
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />
            </div>
            {searchQuery.length >= 1 ? (
              <table className="table-auto w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Username</th>
                    <th className="px-4 py-2">Device Name</th>
                    <th className="px-4 py-2">Sump State</th>
                    <th className="px-4 py-2">Tank State</th>
                    <th className="px-4 py-2">Sump Duration</th>
                    <th className="px-4 py-2">Tank Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {filterUser().map((report, index) => (
                    <tr
                      key={report._id}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
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
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="table-auto w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Username</th>
                    <th className="px-4 py-2">Device Name</th>
                    <th className="px-4 py-2">Sump State</th>
                    <th className="px-4 py-2">Tank State</th>
                    <th className="px-4 py-2">Sump Duration</th>
                    <th className="px-4 py-2">Tank Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {filterUser().map((report, index) => (
                    <tr
                      key={report._id}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
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

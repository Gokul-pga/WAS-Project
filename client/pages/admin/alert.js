import DashboardNavbar from "@/components/DashboardNavbar";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

function Alert() {
  //fetch userdetails from database
  const [userDetails, setUserDetails] = useState([]);
  const getUserDetails = async () => {
    try {
      await fetch("http://localhost:5000/deviceshow" + "/getallreport", {
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

  return (
    <>
      <div className="text-black flex flex-row w-full h-[100vh]">
        <div className="flex flex-row w-[25%]">
          <DashboardNavbar />
        </div>
        <div className="flex flex-col w-[75%] ">
          <div className="bg-sky-400 flex flex-row tracking-wider  w-full px-5 py-3 justify-center text-xl font-bold">
            Alert
          </div>
          <div className="flex flex-col w-full h-[100vh]  justify-center text-lg">
            <div className="bg-blue-400 p-2">
              <input placeholder="Search location " className="px-3 py-2" />
            </div>
            <div>
              <h2>Report Data</h2>
              <table>
                <thead
                  style={{
                    gap: 3,
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    backgroundColor: "red",
                    justifyContent: "space-around",
                  }}
                >
                  <tr className="">
                    <th>Username</th>
                    <th>Device Name</th>
                    <th>Sump State</th>
                    <th>Tank State</th>
                    <th>Sump Duration</th>
                    <th>Tank Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {userDetails.map((report) => (
                    <tr key={report._id}>
                      <td color="#000">{report.username}</td>
                      <td>{report.username}</td>
                      <td>
                        {"High" === report.sump_state ? (
                          <td style={{ color: "red" }}>{report.sump_state}</td>
                        ) : (
                          <td style={{ color: "green" }}>
                            {report.sump_state}
                          </td>
                        )}
                      </td>
                      <td>{report.tank_state}</td>
                      <td>{report.sump_duration}</td>
                      <td>{report.tank_duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Alert;

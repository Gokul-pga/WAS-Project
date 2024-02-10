import DashboardNavbar from "@/components/DashboardNavbar";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

function Alert() {
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
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>Device ID</TableColumn>
                <TableColumn>Location</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Sump-Vol</TableColumn>
                <TableColumn>Tank-Vol</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1" className="bg-gray-100 p-2">
                  <TableCell>Device 1</TableCell>
                  <TableCell>Coimbatore</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell className="text-red-500 font-semibold">
                    Low
                  </TableCell>
                  <TableCell className="text-red-500 font-semibold">
                    Low
                  </TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell>Device 2</TableCell>
                  <TableCell>Coimbatore</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="text-red-500 font-semibold">
                    Low
                  </TableCell>
                  <TableCell className="text-green-500 font-semibold">
                    High
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Alert;

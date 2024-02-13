import UserDashboardNavbar from "@/components/UserDashvboardNavbar";
import React from "react";

function Alert() {
  return (
    <>
      <div className="text-black flex flex-row w-full h-[100vh]">
        <div className="flex flex-row w-[25%]">
          <UserDashboardNavbar />
        </div>
        <div className="flex flex-col w-[75%] ">
          <div className="bg-sky-400 flex flex-row w-full px-5 py-3 justify-center text-xl font-semibold">
            Alert
          </div>
          <div className="flex flex-col w-full h-[100vh] items-center justify-center text-2xl">
            content
          </div>
        </div>
      </div>
    </>
  );
}

export default Alert;

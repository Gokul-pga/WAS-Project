import React from "react";
import { MdDashboard } from "react-icons/md";
import { LuAlertTriangle } from "react-icons/lu";
import { useRouter } from "next/router";
import { FaDatabase } from "react-icons/fa";

function DashboardNavbar() {
  const router = useRouter();
  const NavContent = [
    {
      title: "Dashboard",
      icon: <MdDashboard />,
      to: "/admin/dashboard",
    },
    {
      title: "Alert",
      icon: <LuAlertTriangle className="text-red-500" />,
      to: "/admin/alert",
    },
    {
      title: "Report",
      icon: <FaDatabase />,
      to: "/admin/report",

      // },
      // {
      //   title:"Dashboard",
      //   icon:<MdDashboard />
    },
  ];

  return (
    <>
      <div className="flex flex-col w-full h-[100vh] bg-cyan-900 justify-between py-10 rounded-br-lg">
        <div className="flex flex-row text-white gap-2 justify-center">
          <div className="text-xl text-white">
            <span className="text-blue-600 text-3xl font-semibold">W</span>ater
          </div>
          <div className="text-xl text-white">
            <span className="text-fuchsia-600 text-3xl font-semibold">S</span>
            upply
          </div>
          <div className="text-xl text-white">
            <span className="text-orange-600 text-3xl font-semibold">A</span>
            utomation
          </div>
        </div>

        <div className="flex flex-col w-full justify-center items-center gap-4">
          {NavContent.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  router.push(item.to);
                }}
                className="flex flex-row justify-between bg-white px-8 py-3 rounded-md w-[70%] hover:scale-110 transition-all"
              >
                <div className="text-lg font-semibold">{item.title}</div>
                <div className="text-3xl text-gray-800">{item.icon}</div>
              </div>
            );
          })}
        </div>
        <div className="w-full justify-center flex flex-row">
          <button className="text-xl bg-red-500 px-5 font-semibold rounded-md py-2 text-white">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default DashboardNavbar;

import { addDevice } from "@/routes/addDevice";
import { addReport } from "@/routes/addReport";
import { Modal } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";

function ReportForm({ setReportForm, reportForm, id }) {
  const router = useRouter();
  const [inputfields, setInputfields] = useState({
    username: "",
    devicename: "",
    sump_state: "",
    tank_state: "",
    sump_duration: "",
    tank_duration: "",
  });

  const {
    username,
    devicename,
    sump_state,
    tank_state,
    sump_duration,
    tank_duration,
  } = inputfields;

  const handlesubmit = async () => {
    if (
      username !== "" &&
      devicename !== "" &&
      sump_state !== "" &&
      tank_state !== "" &&
      sump_duration !== "" &&
      tank_duration !== ""
    ) {
      //   setInputfields({
      //     email:"",
      // username :"",
      // devicename :"",
      // deviceId :"",
      // sump_state :"",
      // tank_state :"",
      // sump_duration :"",
      // tank_duration :"",
      //   });
      addReport(
        username,
        devicename,
        sump_state,
        tank_state,
        sump_duration,
        tank_duration
      );
      console.log(inputfields);
      // setReportForm(false);
    } else {
      toast.error("All fields are mandatory");
    }
  };
  return (
    <>
      <Modal open={reportForm}>
        <div className="flex flex-col w-full h-[100vh] justify-center items-center">
          <Toaster />
          <div className="bg-gray-300 gap-3 p-5 rounded-md w-[35%] justify-center items-center flex flex-col">
            <button
              onClick={() => {
                setReportForm(false);
              }}
              className="flex flex-row justify-end w-full "
            >
              <IoCloseOutline className="text-black text-2xl font-semibold" />
            </button>
            <div className="flex flex-col gap-3 ">
              <div>
                <input
                  className=" p-2  text-black font-semibold"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setInputfields({
                      ...inputfields,
                      username: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <input
                  className=" p-2  text-black font-semibold"
                  placeholder="Devicename"
                  value={devicename}
                  onChange={(e) => {
                    setInputfields({
                      ...inputfields,
                      devicename: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <input
                  className=" p-2  text-black font-semibold"
                  placeholder="sump_state"
                  value={sump_state}
                  onChange={(e) => {
                    setInputfields({
                      ...inputfields,
                      sump_state: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <input
                  className=" p-2  text-black font-semibold"
                  placeholder="sump_duration"
                  value={sump_duration}
                  onChange={(e) => {
                    setInputfields({
                      ...inputfields,
                      sump_duration: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <input
                  className=" p-2  text-black font-semibold"
                  placeholder="tank_state"
                  value={tank_state}
                  onChange={(e) => {
                    setInputfields({
                      ...inputfields,
                      tank_state: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <input
                  className=" p-2  text-black font-semibold"
                  placeholder="tank_duration"
                  value={tank_duration}
                  onChange={(e) => {
                    setInputfields({
                      ...inputfields,
                      tank_duration: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="p-3">
              <button
                className="px-5 transition-all hover:scale-110 rounded-sm
                 py-2 text-white items-center bg-black"
                onClick={handlesubmit}
              >
                Create Device
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ReportForm;

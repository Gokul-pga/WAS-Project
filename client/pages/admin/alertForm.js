import { addDevice } from "@/routes/addDevice";
import { addAlert, addReport } from "@/routes/addAlert";
import { Modal } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";

function AlertForm({ setAlertForm, alertForm, id }) {
  const router = useRouter();
  const [inputfields, setInputfields] = useState({
    username: "",
    devicename: "",
    sump_state: "",
    tank_state: "",
    pH_value: "",
  });

  const { username, devicename, sump_state, tank_state, pH_value } =
    inputfields;

  const handlesubmit = async () => {
    if (
      username !== "" &&
      devicename !== "" &&
      sump_state !== "" &&
      tank_state !== "" &&
      pH_value !== ""
    ) {
      setInputfields({
        email: "",
        username: "",
        devicename: "",
        deviceId: "",
        sump_state: "",
        tank_state: "",
        sump_duration: "",
        tank_duration: "",
      });
      addAlert(username, devicename, sump_state, tank_state, pH_value);
      console.log(inputfields);
      setAlertForm(false);
    } else {
      toast.error("All fields are mandatory");
    }
  };
  return (
    <>
      <Modal open={alertForm}>
        <div className="flex flex-col w-full h-[100vh] justify-center items-center">
          <Toaster />
          <div className="bg-gray-300 gap-3 p-5 rounded-md w-[35%] justify-center items-center flex flex-col">
            <button
              onClick={() => {
                setAlertForm(false);
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
                  placeholder="DeviceId"
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
                  placeholder="pH-Value"
                  value={pH_value}
                  type="number"
                  onChange={(e) => {
                    setInputfields({
                      ...inputfields,
                      pH_value: e.target.value,
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
                Create Alert
              </button>
            </div>
            <div className="flex flex-col justify-center w-full items-center">
              <div>Note :-</div>
              <div className="text-red-500 text-justify">
                Sump-state and Tank-state should be "Low" , "Medium" or "High"
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AlertForm;

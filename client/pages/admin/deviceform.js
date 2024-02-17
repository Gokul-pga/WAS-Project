import { addDevice } from "@/routes/addDevice";
import { Modal } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";

function Deviceform({ show, setShow, userId, setUserId }) {
  const router = useRouter();
  const [inputfields, setInputfields] = useState({
    username: "",
    devicename: "",
    location: "",
    devicestatus: "",
    sumpvol: "",
    tankvol: "",
  });

  const { username, devicename, location, devicestatus, sumpvol, tankvol } =
    inputfields;

  const handlesubmit = async () => {
    if (
      devicename !== "" &&
      location !== "" &&
      devicestatus !== "" &&
      sumpvol !== "" &&
      tankvol !== "" &&
      username !== ""
    ) {
      setInputfields({
        username: "",
        devicename: "",
        location: "",
        devicestatus: "",
        sumpvol: "",
        tankvol: "",
      });
      addDevice(
        username,
        devicename,
        location,
        devicestatus,
        sumpvol,
        tankvol,
        userId
      );
      setShow(false);
    } else {
      toast.error("All fields are mandatory");
    }
  };
  return (
    <>
      <Modal open={show}>
        <div className="flex flex-col w-full h-[100vh] justify-center items-center">
          <Toaster />
          <div className="bg-gray-300 gap-3 p-5 rounded-md w-[35%] justify-center items-center flex flex-col">
            <button
              onClick={() => {
                setShow(false);
              }}
              className="flex flex-row justify-end w-full "
            >
              <IoCloseOutline className="text-black text-2xl font-semibold" />
            </button>
            <div className="flex flex-col gap-3 ">
              <div>
                <input
                  className=" p-2 text-black font-semibold"
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
                  placeholder="Device Name"
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
                  placeholder="Location"
                  value={location}
                  onChange={(e) => {
                    setInputfields({
                      ...inputfields,
                      location: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <input
                  className=" p-2  text-black font-semibold"
                  placeholder="Status"
                  value={devicestatus}
                  onChange={(e) => {
                    setInputfields({
                      ...inputfields,
                      devicestatus: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <input
                  className=" p-2  text-black font-semibold"
                  placeholder="Sump_Vol"
                  value={sumpvol}
                  onChange={(e) => {
                    setInputfields({ ...inputfields, sumpvol: e.target.value });
                  }}
                />
              </div>
              <div>
                <input
                  className=" p-2  text-black font-semibold"
                  placeholder="Tannk_Vol"
                  value={tankvol}
                  onChange={(e) => {
                    setInputfields({ ...inputfields, tankvol: e.target.value });
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
            <div className="flex flex-col justify-center w-full items-center">
              <div>Note :-</div>
              <div className="text-red-500">
                Device status should be "Active" or "-"
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Deviceform;

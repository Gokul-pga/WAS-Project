import { Modal } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";

function Deviceform({ show, setShow }) {
  const router = useRouter();
  const [inputfields, setInputfields] = useState({});
  return (
    <>
      <Modal open={show}>
        <div className="flex flex-col w-full h-[100vh] justify-center items-center">
          <div className="bg-gray-300 gap-3 p-5 w-[35%] justify-center items-center flex flex-col">
            <button
              onClick={() => {
                setShow(false);
              }}
              className="flex flex-row justify-end w-full "
            >
              <IoCloseOutline className="text-black text-xl font-bold" />
            </button>
            <div className="flex flex-col gap-3 ">
              <div>
                <input
                  className=" p-2"
                  placeholder="Device Name"
                  value={deviceId}
                  onChange={(e) => {}}
                />
              </div>
              <div>
                <input className=" p-2" placeholder="Location" />
              </div>
              <div>
                <input className=" p-2" placeholder="Status" />
              </div>
              <div>
                <input className=" p-2" placeholder="Sump_Vol" />
              </div>
              <div>
                <input className=" p-2" placeholder="Tannk_Vol" />
              </div>
            </div>
            <div>
              <button>Create Device</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Deviceform;

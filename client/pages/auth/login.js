import { Modal } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import Adminregister from "./adminregister";
import { userLoginAccount } from "@/routes/userlogin";

function Loginpg({ showModal, setShowModal }) {
  const router = useRouter();

  // for user signup usestate and function
  const [userInputFields, setUserInputFields] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInputFields;
  const handlesubmit = (event) => {
    event.preventDefault();
    if (email !== "" && password !== "") {
      userLoginAccount(email, password);
      setUserInputFields({
        email: "",
        password: "",
      });
      console.log(userInputFields);
    } else {
      toast.error("All fields are mandatory");
    }
  };

  return (
    <>
      <Modal open={showModal}>
        <div className="flex flex-row bg-[#bcb5b514]  w-full z-40 h-[100vh] justify-center items-center ">
          <Toaster />

          <div className="flex flex-col bg-[#fff]  w-[80%] md:w-[50%] lg:w-[30%] justify-center items-center p-10 gap-5">
            <div className="flex flex-row justify-end w-full">
              <div></div>
              <IoMdClose
                className="text-2xl font-semibold text-black cursor-pointer "
                onClick={() => {
                  setShowModal(false);
                }}
              />
            </div>
            <div className="text-3xl text-black font-semibold flex-start text-black justify-start w-full">
              Login
            </div>
            <div className="flex flex-col gap-5 justify-between w-full">
              <div className="flex flex-row gap-5 justify-center items-center">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setUserInputFields({
                      ...userInputFields,
                      email: e.target.value,
                    });
                  }}
                  className="px-5 py-2 rounded-sm border-solid border-2 border-black "
                />
              </div>
              <div className="flex flex-row gap-5 justify-center items-center">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setUserInputFields({
                      ...userInputFields,
                      password: e.target.value,
                    });
                  }}
                  className="px-5 py-2 rounded-sm border-solid border-2 border-black"
                />
              </div>
            </div>
            <div>
              <button
                className="px-5 py-2 hover:bg-blue-300 hover:text-white rounded-md transition-all text-black text-xl font-semibold"
                onClick={handlesubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Loginpg;

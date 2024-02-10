import { adminLoginAccount } from "@/routes/adminlogin";
import { admincreateaccount } from "@/routes/adminregister";
import { Modal } from "@mui/material";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

function Adminregister({ adminShowModal, setAdminShowModal }) {
  const [inputFields, setInputFields] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = inputFields;
  const handlesubmit = (event) => {
    event.preventDefault();
    if (email !== "" && password !== "" && username !== "") {
      admincreateaccount(username, email, password);
      console.log(inputFields);
      setInputFields({
        username: "",
        email: "",
        password: "",
      });
    } else {
      toast.error("All fields are mandatory");
    }
  };

  // for Admin signup usestate and function
  const [adminShow, setAdminShow] = useState(false);

  const [adminInputFields, setAdminInputFields] = useState({
    adminemail: "",
    adminpassword: "",
    adminKey: "",
  });
  const { adminemail, adminpassword, adminKey } = adminInputFields;
  const adminhandlesubmit = (event) => {
    event.preventDefault();
    if (adminemail !== "" && adminpassword !== "" && adminKey !== "") {
      if (adminKey == "123") {
        adminLoginAccount(adminemail, adminpassword);
        setAdminInputFields({
          adminemail: "",
          adminpassword: "",
          adminKey: "",
        });
        console.log(adminInputFields);
        // router.push('/admin/adminpg')
      } else {
        toast.error("Secret key not valid");
      }
    } else {
      toast.error("All fields are mandatory");
    }
  };

  return (
    <>
      <Modal open={adminShowModal}>
        <div className="flex flex-row bg-[#bcb5b514]  w-full z-40 h-[100vh] justify-center items-center ">
          <Toaster />

          {adminShow ? (
            <div className="flex flex-col bg-[#fff]  w-[80%] md:w-[50%] lg:w-[40%] justify-center items-center p-10 gap-5">
              <div className="flex flex-row justify-end w-full">
                <div></div>
                <IoMdClose
                  className="text-2xl font-semibold text-black cursor-pointer "
                  onClick={() => {
                    setAdminShow(false);
                  }}
                />
              </div>
              <div className="text-3xl  font-semibold flex-start text-black justify-start w-full">
                Admin Register
              </div>
              <div className="flex flex-col gap-5 justify-between w-full">
                <div className="flex flex-row gap-5 justify-center items-center">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setInputFields({
                        ...inputFields,
                        username: e.target.value,
                      });
                    }}
                    className="px-5 py-2 rounded-sm border-solid border-2 border-black "
                  />
                </div>
                <div className="flex flex-row gap-5 justify-center items-center">
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setInputFields({ ...inputFields, email: e.target.value });
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
                      setInputFields({
                        ...inputFields,
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

              <div className="flex felx-row gap-2 p-3">
                <button
                  className=" text-black text-lg font-semibold px-5 py-2 rounded-md hover:border-solid transition-all border-2 hover:border-black"
                  onClick={() => {
                    setAdminShow(false);
                  }}
                >
                  Back to admin Login
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col bg-[#fff] w-[80%] md:w-[50%] lg:w-[40%]  justify-center items-center p-10 gap-5">
              <div className="flex flex-row justify-end w-full">
                <div></div>
                <IoMdClose
                  className="text-2xl font-semibold text-black cursor-pointer "
                  onClick={() => {
                    setAdminShowModal(false);
                  }}
                />
              </div>
              <div className="text-3xl  font-semibold flex-start text-black justify-start w-full">
                Admin Login
              </div>
              <div className="flex flex-col gap-5 justify-between w-full">
                <div className="flex flex-row gap-5 justify-center items-center">
                  <input
                    type="text"
                    placeholder="Email"
                    value={adminemail}
                    onChange={(e) => {
                      setAdminInputFields({
                        ...adminInputFields,
                        adminemail: e.target.value,
                      });
                    }}
                    className="px-5 py-2 rounded-sm border-solid border-2 border-black "
                  />
                </div>
                <div className="flex flex-row gap-5 justify-center items-center">
                  <input
                    type="password"
                    placeholder="Password"
                    value={adminpassword}
                    onChange={(e) => {
                      setAdminInputFields({
                        ...adminInputFields,
                        adminpassword: e.target.value,
                      });
                    }}
                    className="px-5 py-2 rounded-sm border-solid border-2 border-black"
                  />
                </div>
                <div className="flex flex-row gap-5 justify-center items-center">
                  <input
                    type="password"
                    placeholder="Secret key"
                    value={adminKey}
                    onChange={(e) => {
                      setAdminInputFields({
                        ...adminInputFields,
                        adminKey: e.target.value,
                      });
                    }}
                    className="px-5 py-2 rounded-sm border-solid border-2 border-black"
                  />
                </div>
              </div>
              <div>
                <button
                  className="px-5 py-2 hover:bg-blue-300 hover:text-white rounded-md transition-all text-black text-xl font-semibold"
                  onClick={adminhandlesubmit}
                >
                  Submit
                </button>
              </div>
              <div className="flex flex-row  gap-2">
                <div>Don't have account?</div>
                <button
                  className="font-semibold"
                  onClick={() => {
                    setAdminShow(true);
                  }}
                >
                  {" "}
                  Admin Register
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Adminregister;

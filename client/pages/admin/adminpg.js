import { usercreateaccount } from "@/routes/userregister";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

function Adminpg() {
  const router = useRouter();
  const [inputFields, setInputFields] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = inputFields;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
  const handlesubmit = (event) => {
    event.preventDefault();
    if (email !== "" && password !== "" && username !== "") {
      if (!emailRegex.test(email)) {
        toast.error("Invalid email address");
        return;
      }

      // Validate password using regex
      if (!passwordRegex.test(password)) {
        toast.error("Password must meet the criteria.");
        return;
      }
      //usercreateaccount(email, password, username);
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

  const [userDetails, setUserDetails] = useState([]);
  const getUserDetails = async () => {
    try {
      await fetch("http://localhost:5000/userjwt" + "/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => setUserDetails(data.data));
      console.log("ok");
    } catch (error) {
      console.log(error, "get user details error");
    }
  };

  const deleteuser = async (id) => {
    try {
      await fetch("http://localhost:5000/userjwt" + `/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "appliaction/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "deleted") {
            toast.success("Deleted");
          }
        });
    } catch (error) {
      console.log(error, "delete user error");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [userDetails]);

  return (
    <>
      <div className="flex flex-col justify-center md:justify-normal md:items-start items-center md:flex-row  w-full z-40 h-[100vh] ">
        <Toaster />
        <div className="flex flex-col w-[100%] md:w-[30%] h-[100vh] bg-black ">
          <div className="flex flex-col  w-[100%] justify-center items-center p-10 gap-5">
            <div className="text-3xl font-semibold flex text-white justify-center w-full">
              Create User
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
                  className="px-5 py-2 rounded-sm border-white"
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
                  className="px-5 py-2 rounded-sm"
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
                  className="px-5 py-2 rounded-sm border-white"
                />
              </div>
            </div>
            <div>
              <button
                className="px-5 py-2 hover:bg-blue-500 transition-all rounded-md text-white text-xl font-semibold"
                onClick={handlesubmit}
              >
                Create
              </button>
            </div>
          </div>
          <div className="flex flex-row w-full justify-center items-center">
            <button
              onClick={() => {
                router.push("/admin/dashboard");
              }}
              className="text-white bg-red-500 px-3 py-2 rounded-md font-semibold hover:scale-110 transition-all cursor-pointer"
            >
              Go To Dashboard
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-[100%] md:w-[70%] h-[100vh] bg-white p-5">
          {userDetails.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center px-5 py-3 bg-gray-300 gap-5 w-[40%] rounded-md justify-between"
              >
                <div className="flex-flex-col gap-5">
                  <div className="pb-2 flex flex-row gap-2">
                    <div className="font-bold">Username:</div>{" "}
                    <div className="font-semibold">{item.username}</div>
                  </div>
                  <div className=" flex flex-row gap-2">
                    <div className="font-bold">Email:</div>{" "}
                    <div className="font-semibold">{item.email}</div>
                  </div>
                </div>
                <div className="flex flex-row justify-around w-full">
                  <button
                    onClick={() => {
                      const id = item._id;
                      console.log(id);
                      deleteuser(id);
                    }}
                  >
                    <MdDelete className="text-2xl text-red-500" />
                  </button>
                  <button>
                    <FaUserEdit className="text-2xl text-red-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Adminpg;

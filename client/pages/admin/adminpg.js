import { usercreateaccount } from '@/routes/userregister';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { MdDelete } from "react-icons/md";

function Adminpg() {

    const router = useRouter();
    const [inputFields, setInputFields] = useState({
        username:"",
        email:"",
        password:"",
    })

    const{username,email,password} = inputFields;
    const handlesubmit = (event) => {
        event.preventDefault();
        if(email !== "" && password !== "" && username !== ""){
            usercreateaccount(email,password,username);
            console.log(inputFields);
        }else{
            toast.error("All fields are mandatory");
        }
    }

const [userDetails, setUserDetails] = useState([]);
    const getUserDetails = async() => {
        try {
            await fetch("http://localhost:5000/jwt" + "/getuser",{
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                  
            }).then((res)=> res.json()).then((data)=>
            setUserDetails(data.data))
            console.log(data.data,"xxxx")

        } catch (error) {
            console.log(error,"get user details error");
        }
    }

    useEffect(() => {
      getUserDetails();
    }, [userDetails]);
    


  return (
    <>
    <div className='flex flex-col justify-center md:justify-normal md:items-start items-center md:flex-row bg-black  w-full z-40 h-[100vh] '>
    <Toaster />
       <div className='flex flex-col w-[100%] md:w-[30%] h-[100vh]'>
       <div className='flex flex-col  w-[100%] justify-center items-center p-10 gap-5' >
            <div className='text-3xl font-semibold flex text-white justify-center w-full'>
                Create User
            </div>
            <div className='flex flex-col gap-5 justify-between w-full'>
            <div className='flex flex-row gap-5 justify-center items-center'>
                    <input type='text' placeholder='Username' value={username} onChange={(e)=>{setInputFields({...inputFields,username:e.target.value})}} className='px-5 py-2 rounded-sm border-white'/>
                </div>
                <div className='flex flex-row gap-5 justify-center items-center'>
                    <input type='text' placeholder='Email' value={email} onChange={(e)=>{setInputFields({...inputFields,email:e.target.value})}} className='px-5 py-2 rounded-sm'/>
                </div>
                <div className='flex flex-row gap-5 justify-center items-center'>
                    <input type='password' placeholder='Password' value={password} onChange={(e)=>{setInputFields({...inputFields,password:e.target.value})}} className='px-5 py-2 rounded-sm border-white'/>
                </div>
                
                
            </div>
            <div>
                <button className='px-5 py-2 hover:bg-blue-300 rounded-md text-white text-xl font-semibold' onClick={handlesubmit}>Create</button>
            </div>
            
            
        </div>
       </div>
       <div className='flex flex-col gap-5 w-[100%] md:w-[70%] bg-white p-5'>
        
       <div className='flex flex-row items-center px-5 py-3 bg-gray-300 h-20 w-[33%] rounded-md justify-between'>
        <div className='flex-flex-col gap-5'>
        <div className='pb-2'>Username: {userDetails.username}</div>
        <div>Email: {userDetails.email}</div>
        </div>
        <div>
        <MdDelete className='text-2xl text-red-500'/>
        </div>
        </div>
       </div>
        </div>
    </>
  )
}

export default Adminpg;
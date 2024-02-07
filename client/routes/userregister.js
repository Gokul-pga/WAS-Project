import { jwt } from "@/envfile/auth"
import toast from "react-hot-toast";

export const usercreateaccount = async(username,email,password)=>{
    try {
        await fetch("http://localhost:5000/jwt" + "/adduser",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            body:JSON.stringify({
                username,email,password
            })
        }).then((res) => res.json())
        .then((data)=>{
            console.log(data,"user registried");
            if(data.status == "ok"){
                toast.success("user Account created");
            }
        })
    } catch (error) {
        console.log(error,"user account create error");
    }

}
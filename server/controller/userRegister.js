const express = require("express");
const bcrypt = require("bcrypt")
const { userAuth } = require("../model/userRegister");

exports.userRegister = async(req,res) => {
    const {username,email,password} = req.body;
    const encryptpassword = await bcrypt.hash(password,10)
        const olduser = await userAuth.findOne({email})
    try {
        if(olduser){
            return res.send({status:"ok",data:"user already exists"})
        }
        await userAuth.create({
            email,
            password:encryptpassword,
            username
        })
        res.send({status:"ok",data:req.body})
    } catch (error) {
        console.log(error,"user login error");
    }
}


exports.getUser = async(req,res) => {
    try {
        const allData = await userAuth.find({});
        res.send({status:"ok",data:allData})
    } catch (error) {
        console.log(error,"Get User details error");
    }
    }
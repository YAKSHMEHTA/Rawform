import { Timestamp } from "mongodb";
import Usermodel from "../Schema/Schema.js"
import {createAccessToken,createRefreshToken} from "../Utils/SecretToken.js"
import bcrypt from 'bcryptjs'

export const Signup = async(req,res,next)=>{
    try{
        const {name,email,password} = req.body;
        if(name === null && email === null && password === null ) return;
        const existingUser = await Usermodel.findOne({email});
        if(existingUser){
            return res.json({msg:"user already exist"});
        }
        const hashedpassword = await bcrypt.hash(password,10)
        const user = await Usermodel.create({
            name,email,password:hashedpassword,Timestamp:true
        })
        return  res.json({msg:"user created"});;
    }catch(e){
        console.log("error :", e)
    }   
}

export const Login = async(req,res) =>{

    const {email,password} = req.body
    if(!email || !password){
        res.send("email and password both required");
    }

    const isUser = await Usermodel.findOne({email});

    if(!isUser){
        return res.send("No user foun with this email");
    }
    console.log(isUser);
    const match = await bcrypt.compare(password,isUser.password);

    if(!match){
        res.send("wrong password");
    }

    const accessToken = createAccessToken(isUser.id);
    isUser.refreshtoken =  createRefreshToken(isUser.id);
    console.log("access token : ",accessToken)
    console.log("logged in")
    res.cookie("token",accessToken,{
        secure: false,
        sameSite: "strict",
    })
    await isUser.save();
    res.send("logged in");
}
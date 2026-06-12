import { Timestamp } from "mongodb";
import Usermodel from "../Schema/Schema.js"
import bcrypt from 'bcryptjs'

export const Signup = async(req,res,next)=>{
    try{
        const {name,email,password} = req.body;
        if(name === null && email === null && password === null ) return;
        const existingUser = await Usermodel.findOne({email});
        if(existingUser){
            return res.json({msg:"user already exist"});
        }
        const hashedpassword = await bcrypt.hash(password,"10")
        const user = await Usermodel.create({
            name,email,hashedpassword,Timestamp:true
        })
        
    }catch(e){
        console.log("error :", e)
    }
    
}
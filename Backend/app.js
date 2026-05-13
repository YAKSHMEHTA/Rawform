import express from 'express';
import mongodb from 'mongodb';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import Usermodel from './Schema/Schema.js'
const app = express();

dotenv.config();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("This is home page");
})

app.post("/createuser",async(req,res)=>{
    
    try{
        const user = new Usermodel();
        const saveduser = await user.save(req.body);
        res.send(req.body)
        console.log("sucess")
    }catch(e){
        console.log(e);
    }
})

app.get("/createuser", async (req, res) => {
  try {
    const user = await Usermodel.create({
      name: "Yaksh",
      email: "yaksh@gmail.com",
      password: "123456",
      phone: "9876543210"
    });

    res.send(user);

  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

mongoose.connect(process.env.URI)
    .then(()=>{
    app.listen('8080',()=>{
        console.log("DataBase is connected");
        console.log("server is runnin on port 8080");
    })
})
.catch((err) => console.error("DB connection error:", err))


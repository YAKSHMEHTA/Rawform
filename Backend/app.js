import express from 'express';
import mongodb from 'mongodb';
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';
import cors from 'cors'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import Usermodel from './Schema/Schema.js';
import ProductModel from './Schema/productSchema.js';
import authRoute from './Routes/AuthRoute.js'
import { decode } from 'jsonwebtoken';
import productSchema from './Schema/productSchema.js';
const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",credentials: true
  })
)
app.use("/auth", authRoute)

app.get("/",(req,res)=>{
    res.send("This is home page");
})

app.post("/createuser",async(req,res)=>{
    try{
        const user = new Usermodel();
        const saveduser = await user.save(req.body);
        res.send(req.body)
    }catch(e){
        console.log(e);
    }
})

app.get("/shop/detail",async(req,res)=>{
  const slug =req.query.slug;
  const data = await ProductModel.find({slug:slug});
  res.json(data);
})

app.get("/shop",async(req,res) => {
  const dropNum = req.query.drop
  const data = await ProductModel.find({ drop: dropNum });
  res.json(data);
})

app.get("/createuser", async (req, res) => {
  try {
    const user = await Usermodel.create({
      name: "wasd",
      email: "wdasd@gmail.wadsd",
      password: "dyhdth",
      phone: "9876543210",
      refreshtoken:"dojngipodjsohijsdiojoie"
    });

    res.send(user);

  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.post("/addtocart",async(req,res)=>{
  const { slugg } = req.body;

  const token = req.cookies?.token;

  const decoded = jwt.verify(token,process.env.access_token_secret);

  const id = decoded.id

  const user = await Usermodel.findOne({_id:id});
  const product = await productSchema.findOne({slug:slugg})
  user.cart.push({
    productId:product._id,
    size:"M",
    color: "black",
    quantity: 4,
  });
  
  user.save();
  return res.send("done");
})

app.post('/productinit',async(req,res)=>{
  try {
    const prod = new ProductModel(req.body);
    const saveData = await prod.save();
    res.send(saveData);
  } catch (e){
    console.log(e);
  }
})

mongoose.connect(process.env.URI)
    .then(()=>{
    app.listen('8080',()=>{
        console.log("DataBase is connected");
        console.log("server is runnin on port 8080");
    })
})
.catch((err) => console.error("DB connection error:", err))

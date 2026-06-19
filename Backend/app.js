import express from "express";
import mongodb from "mongodb";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import Usermodel from "./Schema/Schema.js";
import ProductModel from "./Schema/productSchema.js";
import authRoute from "./Routes/AuthRoute.js";
import { createAccessToken, createRefreshToken } from "./Utils/SecretToken.js";
import { decode } from "jsonwebtoken";
import productSchema from "./Schema/productSchema.js";
const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("This is home page");
});

app.post("/createuser", async (req, res) => {
  try {
    const user = new Usermodel();
    const saveduser = await user.save(req.body);
    res.send(req.body);
  } catch (e) {
    console.log(e);
  }
});

app.get("/cart", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.redirect("/login");
    }
    const decoded = await jwt.verify(token, process.env.access_token_secret);
    const id = decoded.id;
    const user = await Usermodel.findOne({ _id: id });
    console.log("cart");
    const data = user.cart;
    const idArr = [];
    data.forEach((element) => {
      idArr.push(element.productId);
    });
    const pdata = await productSchema.find({
      _id: { $in: idArr },
    });
    return res.send({ data, pdata });
  } catch (e) {
    console.log(e);
  }
});

app.get("/shop/detail", async (req, res) => {
  const slug = req.query.slug;
  const data = await ProductModel.find({ slug: slug });
  res.json(data);
});

app.get("/shop", async (req, res) => {
  const dropNum = req.query.drop;
  const data = await ProductModel.find({ drop: dropNum });
  res.json(data);
});

app.get("/createuser", async (req, res) => {
  try {
    const user = await Usermodel.create({
      name: "wasd",
      email: "wdasd@gmail.wadsd",
      password: "dyhdth",
      phone: "9876543210",
      refreshtoken: "dojngipodjsohijsdiojoie",
    });

    res.send(user);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.post("/addtocart", async (req, res) => {
  const { slugg, qty, size } = req.body;

  const token = req.cookies?.token;

  const decoded = jwt.verify(token, process.env.access_token_secret);

  const id = decoded.id;

  const user = await Usermodel.findOne({ _id: id });
  const product = await productSchema.findOne({ slug: slugg });

  const item = user.cart.find(
    (item) => item.productId.toString() === product._id.toString(),
  );

  if (item) {
    item.quantity += qty;
    console.log("increased")
  } else {
    user.cart.push({
      productId: product._id,
      size,
      quantity: qty,
      price: product.price,
    });
    console.log("pushed")
  }

  await user.save();

  return res.send("done");
});

app.post("/productinit", async (req, res) => {
  try {
    const prod = new ProductModel(req.body);
    const saveData = await prod.save();
    res.send(saveData);
  } catch (e) {
    console.log(e);
  }
});

app.post("/inc", async (req, res) => {
  try {
    const { id, idx, bool, remove } = req.body;
    const token = req.cookies.token;
    const decoded = await jwt.verify(token, process.env.access_token_secret);
    const userId = decoded.id;
    const user = await Usermodel.findOne({ _id: userId });

    let prev = user.cart[idx].quantity;

    if (remove === true) {
      user.cart.splice(idx, 1);
    } else if (bool === true) {
      prev++;
    } else if (prev > 0) {
      prev--;
    }
    if (remove === false) {
      user.cart[idx].quantity = prev;
    }

    console.log("prev", prev);
    await user.save();
    console.log(user);
    return res.send("done");
  } catch (e) {
    console.log(e);
  }
});

app.post("/refresh", async (req, res) => {
  try {
    const token = req.cookies.refreshtoken;
    if (!token) {
      return res.redirect("/login");
    }
    const decoded = await jwt.verify(token, process.env.access_token_secret);
    const userid = decoded.id;
    const user = await Usermodel.findById(userid);
    const storedRefreshToken = user.refreshtoken;

    if (token !== storedRefreshToken) {
      return res.json({ msg: "refreshToken does not meet" });
    }

    const newRefreshToken = createRefreshToken(userid);
    const newAcessToken = createAccessToken(userid);

    user.refreshtoken = newRefreshToken;

    res.cookie("refreshtoken", newRefreshToken, {
      secure: false,
      sameSite: "strict",
    });

    res.cookie("token", newAcessToken, {
      secure: false,
      sameSite: "strict",
    });

    await user.save();

    return res.send("done");
  } catch (e) {
    console.log(e);
  }
});

mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen("8080", () => {
      console.log("DataBase is connected");
      console.log("server is runnin on port 8080");
    });
  })
  .catch((err) => console.error("DB connection error:", err));

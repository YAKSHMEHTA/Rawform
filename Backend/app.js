import express from "express";
import mongodb from "mongodb";
import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import OrderModel from "./Schema/orderSchema.js";
import Usermodel from "./Schema/Schema.js";
import ProductModel from "./Schema/productSchema.js";
import AuthMiddleware from "./Middlewares/AuthMiddleWare.js";
import Razorpay from "razorpay";
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
var instance = new Razorpay({
  key_id: process.env.razor_key,
  key_secret: process.env.razor_secret,
});

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

app.get("/cart", AuthMiddleware, async (req, res) => {
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
    console.log("increased");
  } else {
    user.cart.push({
      productId: product._id,
      size,
      quantity: qty,
      price: product.price,
    });
    console.log("pushed");
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
      return res.status(401).json({
        message: "No refresh token",
      });
    }
    const decoded = await jwt.verify(token, process.env.refresh_token_secret);
    const userid = decoded.id;
    const user = await Usermodel.findById(userid);
    const storedRefreshToken = user.refreshtoken;

    if (token !== storedRefreshToken) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
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
    return res.status(401).json({
      message: "Token expired",
    });
  }
});

app.post("/v1/verify", async (req, res) => {
  try {
    console.log("========== PAYMENT VERIFICATION START ==========");

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    console.log("Received Data:");
    console.log("Order ID:", razorpay_order_id);
    console.log("Payment ID:", razorpay_payment_id);
    console.log("Signature:", razorpay_signature);

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.razor_secret)
      .update(body)
      .digest("hex");

    console.log("Expected Signature:", expectedSignature);

    if (expectedSignature === razorpay_signature) {
      console.log("✅ Signature Verified");

      const order = await OrderModel.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          paymentStatus: "paid",
          razorpayPaymentId: razorpay_payment_id,
        },
        { new: true }
      );

      console.log("Updated Order:");
      console.log(order);

      if (!order) {
        console.log("❌ Order not found in database");

        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      await Usermodel.findByIdAndUpdate(order.userId, {
        $set: {
          cart: [],
        },
      });

      console.log("✅ User cart cleared");
      console.log("========== PAYMENT VERIFIED ==========");

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id,
      });
    }

    console.log("❌ Signature Mismatch");
    console.log("Received :", razorpay_signature);
    console.log("Expected :", expectedSignature);

    return res.status(400).json({
      success: false,
      message: "Invalid payment signature",
    });
  } catch (e) {
    console.error("❌ Verification Error:");
    console.error(e);

    return res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
});

app.post("/v1/order", AuthMiddleware, async (req, res) => {
  try {
    const { cost } = req.body;

    const userId = req.user.id;

    const user = await Usermodel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const order = await instance.orders.create({
      amount: cost * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId,
      },
    });

    const newOrder = await OrderModel.create({
      userId,
      products: user.cart,
      totalAmount: cost ,
      paymentStatus: "pending",
      orderStatus: "placed",
      razorpayOrderId: order.id, // Razorpay Order ID
      razorpayPaymentId: null, // Will be updated after payment verification
    });

    return res.status(200).json({
      success: true,
      order,
      dbOrder: newOrder,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Unable to create order",
    });
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

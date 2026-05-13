import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;


const UserSchema =  new Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: String,

    addresses: [
      {
        fullName: String,
        phone: String,
        street: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
        isDefault: Boolean,
      },
    ],

    wishlist: [
      {
        type: Types.ObjectId,
        ref: "Product",
      },
    ],

    cart: [
      {
        productId: {
          type: Types.ObjectId,
          ref: "Product",
        },
        size: String,
        color: String,
        quantity: Number,
      },
    ],

    role: {
      type: String,
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);



const Usermodel = new model("User",UserSchema);


export default Usermodel;

import mongoose from "mongoose";


const { Schema, model, Types } = mongoose;


const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    drop: String,
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    comparePrice: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "shirts",
        "tshirts",
        "hoodies",
        "jackets",
        "pants",
        "skirts",
        "knitwear",
        "accessories",
      ],
    },

    images: [
      {
        type: String, 
      },
    ],

    sizes: [
      {
        type: String,
        enum: ["XS", "S", "M", "L", "XL"],
      },
    ],

    colors: [
      {
        type: String,
      },
    ],

    stock: {
      type: Number,
      default: 0,
    },

    material: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 0,
    },

    reviewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
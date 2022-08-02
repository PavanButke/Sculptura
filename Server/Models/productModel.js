import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {
    type: String,
    require: true,
    },
    rating: {
    type: Number,
    require: true,
    },
    comment: {
    type: String,
    require: true,
    },    
  

});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    category: { type: String, required: false },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInstock: { type: Number, required: false },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
   
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

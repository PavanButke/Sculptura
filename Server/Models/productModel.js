import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {
    type: string,
    require: true,
    },
    rating: {
    type: Number,
    require: true,
    },
    comment: {
    type: String,
    require: true,
    }, I
    
  

});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInstock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
   
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

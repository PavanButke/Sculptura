import express from "express";
import asyncHandler from "express-async-handler";
import Product from "./../Models/productModel.js";


const productRoute= express.Router();

//GET ALL PRODUCTS
productRoute.get(
"/",
asyncHandler(async (req,res) => {
const products = await Product.find({});
res.json(products);
})
);

//ONE PRODUCT AT A TIME
productRoute.get(
    "/:id",
    asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
    res.json(product);
    } else {
    res.status(404);
    throw new Error("Product not Found");
    }
    })
);
export default productRoute;
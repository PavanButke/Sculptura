import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/Mongodb.js";
import ImportData from "./DataImport.js"
import productRoute from './Routes/ProductRoute.js';
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from './Routes/UserRoutes.js';
import orderRouter from "./Routes/OrderRoutes.js";
// import Razorpay from 'razorpay';
// import paymentRoutes from './Routes/paymentRoutes.js';
// import cors from "cors";

dotenv.config();
connectDatabase();

const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


//API Call
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter);
app.use("/api/config/paypal", (req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})



app.use(notFound)
app.use(errorHandler)


app.get("/", (req, res) => {
res.send("API is Running ...");
});



  const PORT = process.env.PORT|| 1000;
app.listen(PORT, console.log(`server run in port ${PORT}`));
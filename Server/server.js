import express from "express";

import dotenv from "dotenv";
import connectDatabase from "./config/Mongodb.js";
import ImportData from "./DataImport.js"
import productRoute from './Routes/ProductRoute.js';
import { errorHandler, notFound } from "./Middleware/Errors.js";


dotenv.config();
connectDatabase();
const app = express();

//API Call
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use(notFound)
app.use(errorHandler)


app.get("/", (req, res) => {
res.send("API is Running ...");
});

const PORT = process.env.PORT|| 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
// import express from "express";
// import dotenv from "dotenv";
// import connectDatabase from "./config/Mongodb.js";
// import ImportData from "./DataImport.js"
// import productRoute from './Routes/ProductRoute.js';
// import { errorHandler, notFound } from "./Middleware/Errors.js";
// import userRouter from './Routes/UserRoutes.js';
// import orderRouter from "./Routes/OrderRoutes.js";
// import Razorpay from 'razorpay';
// import shortid from 'shortid';
// // import paymentRoutes from './Routes/paymentRoutes.js';
// import cors from "cors";

// import bodyParser from 'body-parser';


// dotenv.config();
// connectDatabase();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }))


// // //API Call
// app.use("/api/import", ImportData);
// app.use("/api/products", productRoute);
// app.use("/api/users", userRouter)
// app.use("/api/orders", orderRouter);
// app.use("/api/config/paypal", (req, res) => {
//   res.send(process.env.PAYPAL_CLIENT_ID)
// })

// app.use(notFound)
// app.use(errorHandler)


// app.get("/", (req, res) => {
//   res.send("API is Running ...");
// });


// app.get('/get-razorpay-key' , (req, res) => {
// 	res.send({ key: process.env. RAZORPAY_KEY_ID });
// });

// app.post('/create-order', async (req, res) => {
// 	try {
// 	  const instance = new Razorpay({
// 		key_id: process.env.RAZORPAY_KEY_ID,
// 		key_secret: process.env.RAZORPAY_SECRET,
// 	  });
// 	  const options = {
// 		amount: req.body.totalPrice,
// 		currency: 'INR',
// 	  };
// 	  const order = await instance.orders.create(options);
// 	  if (!order) return res.status(500).send('Some error occured');
// 	  res.send(order);
// 	} catch (error) {
// 	  res.status(500).send(error);
// 	}
//   });

// app.post('/pay-order', async (req, res) => {
// 	try {
// 	  const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
// 		req.body;
// 	  const newOrder = Order({
// 		isPaid: true,
// 		amount: amount,
// 		razorpay: {
// 		  orderId: razorpayOrderId,
// 		  paymentId: razorpayPaymentId,
// 		  signature: razorpaySignature,
// 		},
// 	  });
// 	  await newOrder.save();
// 	  res.send({
// 		msg: 'Payment was successfull',
// 	  });
// 	} catch (error) {
// 	  console.log(error);
// 	  res.status(500).send(error);
// 	}
//   });

  
// app.get('/list-orders', async (req, res) => {
// 	const orders = await Order.find();
// 	res.send(orders);
//   })


// const PORT = process.env.PORT || 1000;
// app.listen(PORT, console.log(`server run in port ${PORT}`));



import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/Mongodb.js";
import ImportData from "./DataImport.js"
import productRoute from './Routes/ProductRoute.js';
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from './Routes/UserRoutes.js';
import orderRouter from "./Routes/OrderRoutes.js";
import Razorpay from 'razorpay';
import shortid from 'shortid';
import mongoose from "mongoose";
import Order from "./Models/orderModel.js";
// import paymentRoutes from './Routes/paymentRoutes.js';
import cors from "cors";

import bodyParser from 'body-parser';


dotenv.config();

dotenv.config();
connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// //API Call
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter);
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

// app.use(notFound)
 app.use(errorHandler)


// app.get("/", (req, res) => {
//   res.send("API is Running ...");
// });


mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('mongodb connected');
});

app.use(express.json({ extended: false }));


app.get('/get-razorpay-key', (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

app.post('/create-order', async (req, res) => {
  try { 
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: req.body.amount,
      currency: 'INR',
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send('Some error occured');
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/pay-order', async (req, res) => {
  try {
    const { totalPrice , shippingAddress, amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    const newOrder = Order({
      isPaid: true,
      amount: amount,
	  totalPrice: totalPrice,

      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    await newOrder.save();
    res.send({
      msg: 'Payment was successfull',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});



const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`server started on http://localhost:${port}`)
);

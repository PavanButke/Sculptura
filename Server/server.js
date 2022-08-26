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
// import paymentRoutes from './Routes/paymentRoutes.js';
import cors from "cors";

import bodyParser from 'body-parser';


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

app.use(notFound)
app.use(errorHandler)


app.get("/", (req, res) => {
  res.send("API is Running ...");
});


const razorpay = new Razorpay({
  key_id: 'rzp_test_ubHSpA7szM4jBT',
  key_secret: 'UYplg47NSKZrw88WwTJ1OdGT'
})


app.post('/api/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = 499
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})






const PORT = process.env.PORT || 1000;
app.listen(PORT, console.log(`server run in port ${PORT}`));


app.use(cors())
app.use(bodyParser.json())

// const razorpay = new Razorpay({
// 	key_id: 'rzp_test_uGoq5ABJztRAhk',
// 	key_secret: 'FySe2f5fie9hij1a5s6clk9B'
// })

// app.get('/logo.svg', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'logo.svg'))
// })

// app.post('/verification', (req, res) => {
// 	// do a validation
// 	const secret = '12345678'

// 	console.log(req.body)

// 	const crypto = require('crypto')

// 	const shasum = crypto.createHmac('sha256', secret)
// 	shasum.update(JSON.stringify(req.body))
// 	const digest = shasum.digest('hex')

// 	console.log(digest, req.headers['x-razorpay-signature'])

// 	if (digest === req.headers['x-razorpay-signature']) {
// 		console.log('request is legit')
// 		// process it
// 		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
// 	} else {
// 		// pass it
// 	}
// 	res.json({ status: 'ok' })
// })

// app.post('/api/pay/razorpay', async (req, res) => {
// 	const payment_capture = 1
// 	const amount = 499
// 	const currency = 'INR'

// 	const options = {
// 		amount: amount * 100,
// 		currency,
// 		receipt: shortid.generate(),
// 		payment_capture
// 	}

// 	try {
// 		const response = await razorpay.orders.create(options)
// 		console.log(response)
// 		res.json({
// 			id: response.id,
// 			currency: response.currency,
// 			amount: response.amount
// 		})
// 	} catch (error) {
// 		console.log(error)
// 	}
// })

// app.listen(5000, () => {
// 	console.log('Listening on 5000')
// })
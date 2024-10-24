import express from "express";
import mongoose from "mongoose";
import { advertRouter } from "./routes/advert_route.js";
import vendorRouter from "./routes/vendor_route.js";
import cors from "cors";
// import bodyParser from "body-parser";

// connection to database
await mongoose.connect(process.env.MONGO_URI);

// create an express app
const app = express();

//middlewares
app.use(express.json());

//ude router
app.use(cors());
app.use(advertRouter);
app.use(vendorRouter);
// app.use(bodyParser.json());


//port listening
const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
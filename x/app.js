const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({path : path.join(__dirname, "./.env")})

const {connectDB} = require('./config/connDB');
connectDB();

const userRouter = require("./router/userRoter");
const productRouter = require("./router/productRouter");
const cartRouter = require("./router/cartRoutes");
const buyRouter = require("./router/buyRoutes");
const authRouter = require("./router/authRouter");


const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/shopping-cart", cartRouter);
app.use("/buy", buyRouter);
app.use("/auth", authRouter);


mongoose.connection.once('open', () => {
console.log('Database connected......');
app.listen(8000, () => {
    console.log('Server started......');
});
})


mongoose.connection.on('error', (error) => {
console.error(error);
});


const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./src/config/.env" });
const connectDB = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/user.Routes");
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));

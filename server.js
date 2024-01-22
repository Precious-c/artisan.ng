const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
require("dotenv").config({ path: "./src/config/.env" });
const connectDB = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes");
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));

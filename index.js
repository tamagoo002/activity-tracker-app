const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const PORT = Number(process.env.PORT)||8000;
const indexRouter= require("./routes")
const CORS= require("cors")

mongoose.connect(process.env.DB_URL).then(
    ()=>{
        console.log("database is connected");
    }

);

app.use(CORS());
app.use(express.json());
app.use("/",indexRouter);
app.use((err, req, res, next) => {
    const errMSg = err.toString() || "Something went wrong";
    res.status(500).json({ msg: errMSg });
  });
app.listen(PORT, () => {
    console.log(`app is running ${PORT}`);
  });
const express = require('express')
const app = express();
require('dotenv').config();
const connectToDB = require("./config/db.config.js")
const bookroute=require("./routes/bookroute.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

connectToDB();

app.use("/books",bookroute)

module.exports = app;
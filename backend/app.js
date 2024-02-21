const express = require('express')
const app = express();
require('dotenv').config();
const connectToDB = require("./config/db.config.js")
const bookroute=require("./routes/bookroute.js")
const cors=require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors());
// app.use(cors({
//     origin:"https://localhost:9000",
//     methods:['GET','POST','PUT',['DELETE']],
//     allowedHeaders:['Content-type']
// }));

connectToDB();

app.use("/books",bookroute)

module.exports = app;
const mongoose=require('mongoose')
require("dotenv").config();

const connectToDB=async ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then((conn)=>{
        console.log(`DB connected Successfully :${process.env.MONGODB_URL}`);
    })
    .catch(()=>{
        console.log(err);
    })
}

module.exports=connectToDB;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./Routes/user.cjs')

const app = express();
app.use(bodyParser.json());
const url="mongodb+srv://AhmedGamal5:ahmed5534@project1.6okitrl.mongodb.net/project1?retryWrites=true&w=majority"
         



const connectDB = async()=>{
    try{
        mongoose.set('strictQuery', false);
        mongoose.connect(url);
    }
    catch(err){
        console.log("error while connecting to Mongoose"+err);
        process.exit();
    }

}
connectDB();

app.use('/', userRouter);

app.listen(7000);
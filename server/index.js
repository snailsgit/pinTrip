const express = require('express');
const mongoose = require('mongoose');
const dotenv= require('dotenv');
const cors = require('cors');
const app = express();
dotenv.config();

const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true})
    .then(()=>{
        console.log('MONGO DB CONNECTED');
    })
    .catch((e)=>{
        console.log(e.message);
    });


app.use("/api/pins",pinRoute);
app.use("/api/users",userRoute);

app.listen(5005,()=>{
    console.log('listening on port 5005');
});
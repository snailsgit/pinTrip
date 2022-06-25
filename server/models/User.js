const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        min:3,
        max:40,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
},{timestamps:true});

module.exports = mongoose.model('User',UserSchema);
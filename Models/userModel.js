const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require("validator");
const userSchema = new Schema({
  name:{
    type:String,
    maxLength:[30,"Name cannot exceed 30 characters"],
    minLength:[4,"Name should be more than 4 characters"]
  }, 
  email:{
    type:String,
    required:[true,"Please Enter Your Email"],
    unique:true,
    validate:[validator.isEmail,"Please Enter a valid Email"]
  }, 
  password:{
    type:String,
    required:[true,"Please Enter Your Password"],
    minLength:[8 ,"Password should be greater than 8 characters"],
    select:false
  }

});

module.exports = mongoose.model('User', userSchema);
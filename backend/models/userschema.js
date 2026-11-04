const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  fname: 
  {
    type:String,
    required:true,
  },
  lastname:
  {
    type:String,
    required:true,
  },
  
  email: 
  {
    type:String,
    required:true,
  },
  password: {
    type:String,
    required:true,
  },
role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  
},{timestamps:true}    );

module.exports = model("User", userSchema);

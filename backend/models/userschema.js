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
  
},{timestamps:true}    );

module.exports = model("User", userSchema);

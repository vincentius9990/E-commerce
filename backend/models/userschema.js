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
    trim:true,
    lowercase:true,
    unique:true, // one account per email (also makes login a fast index lookup)
  },
  password: {
    type:String,
    // Google accounts have no password; every other account must have one
    required: function () {
      return !this.googleId;
    },
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
  googleId:{
    type:String,
    unique:true, // make sures that the googleid entered is unique and this is an index 
    sparse:true, // exclude documents that do not have the googleid 
  }
},{timestamps:true}    );

module.exports = model("User", userSchema);

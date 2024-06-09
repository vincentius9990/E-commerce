const mongoose =require('mongoose');
require('dotenv').config();
mongoose.connect(process.env._mongoose).then(()=>{
console.log("database connection successfull");

}).catch((err)=>{
console.log("database connection error",err);

});

module.exports=mongoose;

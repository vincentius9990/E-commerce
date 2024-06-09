const mongoose =require('mongoose');
mongoose.connect("mongodb://localhost:27017/E-Commerce",{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
console.log("database connection successfull");

}).catch((err)=>{
console.log("database connection error",err);

});

module.exports=mongoose;

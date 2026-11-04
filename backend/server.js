const express=require('express');
const app=express();
const mongoose=require('./mongoose');
const routes = require('./routes/routes'); //importing the router
const shippingroute=require('./routes/shippingRouter');
const cors=require('cors');
const route=require('./routes/adminRouter');
const bodyparser=require('body-parser');
const transporter= require('./config/email')
//to use the routes
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyparser.json());
app.use(cors());
app.use('', routes);
app.use('',route);
app.use('',shippingroute);



// to check the gmail connection through the nodemailer
// transporter.verify((error, success) => {
//   if (error) {
//     console.log("Gmail connection failed:", error);
//   } else {
//     console.log("Gmail connection successful!");
//   }
// });

app.listen(3000,()=>{

console.log("express server running");

});
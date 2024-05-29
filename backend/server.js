const express=require('express');
const app=express();
const mongoose=require('./mongoose');
const routes = require('./routes/routes'); //importing the router
const shippingroute=require('./routes/shippingRouter');
const cors=require('cors');
const route=require('./routes/adminRouter');
const bodyparser=require('body-parser');
//to use the routes
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyparser.json());
app.use(cors());
app.use('', routes);
app.use('',route);
app.use('',shippingroute);

app.listen(3000,()=>{

console.log("express server running");

});
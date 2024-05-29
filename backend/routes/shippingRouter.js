const {storeData}=require('../controllers/shippingController');
const express=require('express');
const router=express.Router();


router.post('/ship',storeData);
module.exports=router;
const {storeData,getData}=require('../controllers/shippingController');
const express=require('express');
const router=express.Router();


router.post('/ship',storeData);
router.get('/ship',getData);
module.exports=router;
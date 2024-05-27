const express=require('express');
const router=express.Router();
const adminController =require('../controllers/adminController');
const authMiddleware = require('../Middleware/authMiddleware');
router.get('/admin',authMiddleware,adminController.getusers);

module.exports=router;
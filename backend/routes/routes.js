const express=require('express');
const router=express.Router();
const {createUser,finduser}=require('../controllers/userController.js');
router.post('/register', createUser);
router.post('/login',finduser);
module.exports=router;


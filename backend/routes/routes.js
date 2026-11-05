const express=require('express');
const router=express.Router();
const {createUser,finduser,googleLogin}=require('../controllers/userController.js');
const {forgotPassword, resetPassword} = require('../controllers/authController.js')

router.post('/register', createUser);
router.post('/login',finduser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post('/google',googleLogin)
module.exports=router;


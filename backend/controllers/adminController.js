const User =require('../models/userschema');

const getusers= async(req,res)=>{
try{
const users=await User.find({},{password:0});//get all data except password
if(!users || users.length==0 )// if users array is empty 
    {
return res.status(404).json({message:"no users found"});
    }
    else
    {
        return res.status(200).json(users);
    }



}
catch(err)
{
    res.status(500).json({ error: 'Server error' });
}
}

module.exports={getusers};
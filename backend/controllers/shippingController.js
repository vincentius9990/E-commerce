const Order=require('../models/shippingSchema');


const storeData=async(req,res)=>{

try{
console.log(req.body);
 const newOrder = new Order(req.body);
                 
 await newOrder.save();
 
 res.status(201).json({ message: 'Order stored successfully' });


}



catch(e)
{
res.status(500).json({message:e})

}
}

const getData=async(req,res)=>{

const data=await Order.find();
if(data)
    {
        res.status(200).json({message:"Data retrieved successfully",data});
    }
    else
    {

    }



}


module.exports = { storeData ,getData};

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


module.exports = { storeData };

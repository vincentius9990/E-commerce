const mongoose=require('mongoose');

const shippingSchema = new mongoose.Schema(
{

line1:String,
line2:String,
city:String,
state:String,
zip:String,
cardNumber:  String,
nameOnCard: String, 
expirationDate: String,
cvv: String,
email:String,
phone: String,
subtotal: { type: Number},
discount: { type: Number},
shippingcost:Number,
total: { type: Number},
shippingMethod: { type: String},
createdAt: { type: Date, default: Date.now },
});


const Order = mongoose.model('Order', shippingSchema);

module.exports = Order;
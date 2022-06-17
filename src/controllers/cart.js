const Cart = require("../models/cart");
const Food = require("../models/food")

exports.cart = async (request, response) => {
  const { userId } = request.body;
  try {
    let res = await Cart.findOne({ userId: userId }).populate({path:'items.item', select: 'name price images'});
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

exports.addToCart = async (request, response) => {
  const { userId, itemId } = request.body;

  try {
    let res = await Cart.findOneAndUpdate(
      { userId: userId },
      {
        $push: {
          items: { item: itemId, quantity: 1 },
        },
      },
      { new: true }
    ).populate({path:'items.item', select: 'name price images'});
    // console.log(res);
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

exports.rmFromCart = async (request, response) => {
  const { userId, itemId } = request.body;
  try {
    let res = await Cart.findOneAndUpdate(
      { userId: userId },
      {
        $pull: {
          items: { item: itemId },
        },
      },
      { new: true }
    ).populate({path:'items.item', select: 'name price images'});
    // console.log(res);
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

exports.changeCount = async (request, response) => {
  const { userId, itemId, quantity } = request.body;
  try {
    let res = await Cart.findOneAndUpdate(
      { userId: userId, "items.item": itemId },
      {
        $set: { "items.$.quantity": quantity },
      },
      { new: true }
    ).populate({path:'items.item', select: 'name price images'});
    // console.log(res);
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

exports.cartTotal = async (request, response) => {
  const {itemId, userId} = request.body
  try {
    let cartRes = await Cart.findOne({ userId: userId })
    let totalPrice = 0;
    for(item of cartRes.items){
      let itemPriceObj = Food.findOne({_id:itemId}).select({price:1})
      totalPrice += itemPriceObj.price
    }
    response.status(200).send({success:true, totalPrice:totalPrice})
    
  } catch (error) {
    response.status(200).send({success:false, message:"cannot get the total price"})
  }
}

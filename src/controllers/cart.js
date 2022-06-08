const Cart = require("../models/cart");
exports.cart = async (request, response) => {
  const { userId } = request.body;
  try {
    let res = await Cart.findOne({ userId: userId });
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
          items: { itemId: itemId, quantity: 1 },
        },
      },
      { new: true }
    );
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
          items: { itemId: itemId },
        },
      },
      { new: true }
    );
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
      { userId: userId, "items.itemId": itemId },
      {
        $set: { "items.$.quantity": quantity },
      },
      { new: true }
    );
    // console.log(res);
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

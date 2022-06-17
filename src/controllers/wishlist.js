const Wishlist = require("../models/wishlist");

exports.wishlist = async (request, response) => {
  const { userId } = request.body;
  try {
    let res = await Wishlist.findOne({ userId: userId }).populate({path:'items.item', select: 'name price images'});
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

exports.addToWishlist = async (request, response) => {
  const { userId, itemId } = request.body;

  try {
    let res = await Wishlist.findOneAndUpdate(
      { userId: userId },
      {
        $push: {
          items: {item: itemId},
        },
      },
      { new: true }
    ).populate({path:'items.item', select: 'name price images'});
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

exports.rmFromWishlist = async (request, response) => {
  console.log(request.body)
  const { userId, itemId } = request.body;

  try {
    let res = await Wishlist.findOneAndUpdate(
      { userId: userId },
      {
        $pull: {
          items: {item:itemId},
        },
      },
      { new: true }
    ).populate({path:'items.item', select: 'name price images'});
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

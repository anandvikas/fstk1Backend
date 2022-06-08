const Wishlist = require("../models/wishlist");

exports.wishlist = async (request, response) => {
  const { userId } = request.body;
  try {
    let res = await Wishlist.findOne({ userId: userId });
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
          items: itemId,
        },
      },
      { new: true }
    );
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

exports.rmFromWishlist = async (request, response) => {
  const { userId, itemId } = request.body;

  try {
    let res = await Wishlist.findOneAndUpdate(
      { userId: userId },
      {
        $pull: {
          items: itemId,
        },
      },
      { new: true }
    );
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

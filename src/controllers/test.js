const Test = require("../models/test");
// const Food = require("../models/food")

exports.test = async (request, response) => {
  const { userId } = request.body;
  try {
    let res = await Test.findOne({ userId: userId }).populate({path:'items.item', select: 'name price'})
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

exports.addToTest = async (request, response) => {
    const { userId, itemId } = request.body;
  
    try {
      let res = await Test.findOneAndUpdate(
        { userId: userId },
        {
          $push: {
            items: { item: itemId, quantity: 1 },
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
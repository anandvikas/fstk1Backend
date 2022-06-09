const Reviews = require("../models/reviews");
const Food = require("../models/food")

exports.reviews = async (request, response) => {
  const { body } = request;

  try {
    let res = await Reviews.findOne({ itemId: body.itemId });
    response.status(200).send({
      success: true,
      body: res,
    });
  } catch (error) {
    console.log(error);
    response.status(200).send({
      success: false,
      message: "Can't fetch the reviews",
    });
  }
};
exports.addReview = async (request, response) => {
  const { body } = request;
  try {
    let res = await Reviews.findOneAndUpdate(
      { itemId: body.itemId },
      {
        $push: {
          reviews: {
            userName: body.userName,
            userId: body.userId,
            rating: body.rating,
            message: body.message,
          },
        },
      },
      { new: true }
    );

    let ratingSum = 0;
    for(let ele of res.reviews){
      ratingSum += ele.rating
    }
    let calculatedAvgRating = ratingSum/res.reviews.length
    console.log(calculatedAvgRating)

    await Food.updateOne({_id:body.itemId},{$set:{avgRating:parseFloat(calculatedAvgRating.toFixed(2))}})
    response.status(200).send({
      success: true,
      message: "review added",
      body: res,
    });
  } catch (error) {
    console.log(error);
    response.status(200).send({
      success: false,
      message: "Can't add the review",
    });
  }
};

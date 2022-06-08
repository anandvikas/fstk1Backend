const Food = require("../models/food");
const Reviews = require("../models/reviews");

exports.add = async (request, response) => {
  const { body } = request;
  const food = new Food(body);
  try {
    let res = await food.save();
    let foodReviews = new Reviews({
      itemId: res._id,
      reviews: [],
    });
    await foodReviews.save();
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

exports.get = async (request, reponse) => {
  const { query } = request;
  // console.log(query);
  try {
    let res = await Food.find(query);
    reponse.status(200).send(res);
  } catch (error) {
    reponse.status(400).send(error);
  }
};

exports.getOne = async (request, response) => {
  const { id } = request.params;
  try {
    let res = await Food.findById(id);
    response.status(200).send(res);
  } catch (error) {
    response.status(400).send(error);
  }
};

exports.patchOne = async (request, response) => {
  const { id } = request.params;
  const { body } = request;

  try {
    let res = await Food.findByIdAndUpdate(id, {
      $set: body,
    });
    // console.log(res);
    response.status(200).send(res);
  } catch (error) {
    // console.log(error);
    response.status(400).send(error);
  }
};

exports.deleteOne = async (request, response) => {
  const { id } = request.body;
  try {
    let res = await Food.deleteOne({ _id: id });
    await Reviews.deleteOne({ itemId: id });
    console.log(res);
    response.status(200).send(res);
  } catch (error) {
    console.log(error);
    response.status(400).send(error);
  }
};

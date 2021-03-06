const Food = require("../models/food");
const Reviews = require("../models/reviews");
const NewsletterSubscriber = require("../models/newsletterSubscribers");
const { emailSend } = require("../helper/helper");

exports.add = async (request, response) => {
  const { body, file } = request;
  let ingredients = JSON.parse(body.ingredients)
  // console.log(file)
  const food = new Food({
    ...body, ingredients: ingredients, images: [
      {
        src: `http://192.168.235.200:${process.env.PORT}/image/${new Date().getFullYear()}_${new Date().getMonth()}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${file.originalname}`,
        alt: `${new Date().getFullYear()}_${new Date().getMonth()}_${new Date().getDate()}_${new Date().getHours()}_${new Date().getMinutes()}_${file.originalname}`
      }
    ]
  });  

  try {
    let res = await food.save();
    let foodReviews = new Reviews({
      itemId: res._id,
      reviews: [],
    });
    await foodReviews.save();

    let emailList = await NewsletterSubscriber.find()
    for (let element of emailList) {
      let to = element.emailAddress;
      let subject = "New Food added";
      let html = `<h3>New Food Added</h3> <br> <a href="${process.env.FRONTEND_URL}/food/${res._id}" target="_blank">See here</a>`;
      emailSend(response, to, subject, html)
    }

    response.status(200).send(res);
  } catch (error) {
    console.log(error)
    response.status(400).send(error);
  }
};

exports.get = async (request, reponse) => {
  const { query } = request;

  let findQuery = {}
  let sortQuery = {}

  if (query.catagory) {
    findQuery.catagory = query.catagory
  }

  if (query.sort) {
    switch (query.sort) {
      case 'addedOnDesc': {
        sortQuery.addedOn = -1;
        break;
      }
      case 'addedOnAsc': {
        sortQuery.addedOn = 1;
        break;
      }
      case 'ratingDesc': {
        sortQuery.avgRating = -1;
        break;
      }
      case 'ratingAsc': {
        sortQuery.avgRating = 1;
        break;
      }
      case 'priceDesc': {
        sortQuery.price = -1;
        break;
      }
      case 'priceAsc': {
        sortQuery.price = 1;
        break;
      }
      default: {
        break;
      }
    }
  }

  let perPage = query.perPage ?? 5;
  let page = query.page ?? 1;
  // console.log(query);

  try {
    let res = await Food.find(findQuery).sort(sortQuery).skip((page - 1) * perPage).limit(perPage);
    let count = await Food.count(findQuery)
    console.log(count)
    reponse.status(200).send({ results: count, data: [...res] });
  } catch (error) {
    console.log(error)
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

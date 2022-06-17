const NewsletterSubscriber = require("../models/newsletterSubscribers");

exports.add = async (request, response) => {
  const { emailId } = request.body;
  let subscriber = new NewsletterSubscriber({emailAddress:emailId})
  try {
    let res = await subscriber.save()
    console.log(res)
    response.status(200).send({success:true});
  } catch (error) {
    console.log(error)
    response.status(200).send({success:false});
  }
};
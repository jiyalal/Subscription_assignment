const subsciptionModel = require("../models/subscriptionmodels");
// const moment = require("moment");
const ObjectId = require("mongoose").Types.ObjectId;
const jwt = require("jsonwebtoken");

const createSubsciption = async function (req, res) {
  try {
    // storing the data from body in object format in a variable
    const body = req.body;
    

    let now = new Date();

    // adding a new kew value pair {idPublished:true} to the enterd object because on new subscription creation it should get published
    body.isPublished = true;
    body.subScriptionStart = new Date();
    body.expire = new Date(now.setMonth(now.getMonth() + body.tenure));
   

    // creating a new document using the conditions inside the 'body' object
    let subScriptionData = await subsciptionModel.create(body);
    return res.status(201).send({ status: "success", data: subScriptionData });
  } catch (err) {
    return res.status(500).send({
      msg: "Please try again later",
      error: err.message,
    });
  }
};

// Get Subscription //

const getSubcription = async function (req, res) {
  try {
    // stored all the data from query params in a variable
    let data = req.query;
    let userId = data.userId; // store enterd authorId in a variable

    //check if userId key is enterd in filter and if its is a valid objectid
    if ("userId" in data && !ObjectId.isValid(userId)) {
      return res.status(400).send({ status: "error", msg: "UserId invalid" });
    }

    data.isDeleted = false;
    data.isPublished = true;

    let subscriptionData = await subsciptionModel
      .findOne(data)
      .populate("userId"); //find return array of object

    if (!subscriptionData) {
      return res.status(200).send({
        status: "success",
        msg: "No subscription found",
      });
    }

    const currentDate = new Date()
    if(currentDate>subscriptionData.expire){
        return res.status(200).send({
            status:"success",
            msg: "Subscription is expired",
           
          });
    }
    // if data found in DB
    return res.status(200).send({
      status: "success",
      returned_document: subscriptionData.length,
      data: subscriptionData,
    });
  } catch (err) {
    return res.status(500).send({
      msg: "Please try again later",
      error: err.message,
    });
  }
};

module.exports = { createSubsciption, getSubcription };

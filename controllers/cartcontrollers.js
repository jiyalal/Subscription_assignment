const userModel = require("../models/usersmodels");
const cartModel = require("../models/cartmodel");
const mongoose = require("mongoose");

let createCart = async function (req, res) {
  try {
    //if cart is not present
    let create = await cartModel.create(req.body);
    return res
      .status(201)
      .send({ status: true, message: "Success", data: create });
  } catch (err) {
    // console.log(err)
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.createCart = createCart;

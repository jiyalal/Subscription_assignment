const userModel = require("../models/usersmodels");
const ObjectId = require("mongoose").Types.ObjectId;
const jwt = require("jsonwebtoken");

//    User registration /////////

const userRegistration = async function (req, res) {
  try {
    let data = req.body; //take the data from the request body

    // Create a new document
    let savedData = await userModel.create(data);
    res.status(201).send({
      status: true,
      message: "User susscessfully registered",
      data: savedData,
    });
  } catch (err) {
    res.status(500).send({
      msg: "Please try again later",
      error: err.message,
    });
  }
};

////   Login user   /////////////

const loginUser = async function (req, res) {
  let user = await userModel.findOne(req.body);
  if (!user)
    return res.status(400).send({
      status: false,
      msg: "username or the password is not corerct",
    });
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
      password: user.password,
    },
    "jktyagi"
  );
  res.setHeader("x-api-key", token);
  res.send({
    status: true,
    msg: "Login Successfull",
    data: user,
    token: token,
  });
};



module.exports = { userRegistration, loginUser };



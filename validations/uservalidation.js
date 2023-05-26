const userModel = require("../models/usersmodels");

//>>>>>>>>>>>>>>>>>>>>>> Registation Validation>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const userRegistrationValidation = async function (req, res, next) {
  try {
    let data = req.body;

    // Check all the mandatory fields are present in the request body.
    if (!data.email) {
      return res.status(400).send({
        status: "error",
        message: "E-mail is required",
      });
    }

    if (!data.password) {
      return res.status(400).send({
        status: "error",
        message: "Password is required",
      });
    }

    if (!data.phone) {
      return res.status(400).send({
        status: "error",
        message: "Phone number is required",
      });
    }

    // Check the validation of email
    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email)) {
      return res.status(400).send({
        status: false,
        message: "Bad Request. Email should be a valid email address",
      });
    }

    // Check password validation
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,15}$/.test(
        data.password
      )
    ) {
      return res.status(400).send({
        status: false,
        message:
          "Bad Request. Password should be a combination of at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
      });
    }

    // Check if the entered email is already present in the Database
    let dbData = await userModel.findOne({ email: data.email });
    if (dbData) {
      //check if any document is returned from DB call
      return res.status(400).send({
        status: false,
        msg: "Bad Request. This email already exist. Please enter another email",
      });
    }

    next();
  } catch (err) {
    res.status(500).send({
      msg: "Serverside Errors. Please try again later",
      error: err.message,
    });
  }
};

//  XXXXX  Login Validation XXXXXXXXXXXXXX

const loginvalidation = async function (req, res, next) {
  try {
    let body = req.body;

    if (!body.email) {
      return res
        .status(400)
        .send({ status: "error", message: "Enter your email" });
    }

    if (!body.password) {
      return res
        .status(400)
        .send({ status: "error", message: "Enter your password" });
    }

    next();
  } catch (err) {
    res.status(500).send({
      msg: "Serverside Errors. Please try again later",
      error: err.message,
    });
  }
};

module.exports = { userRegistrationValidation, loginvalidation };

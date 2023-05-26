const jwt = require("jsonwebtoken");

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const authentication = async function (req, res, next) {
  try {
    // check if token key is present in the header/cookies
    let token = req.headers["x-Api-key"];

    if (!token) token = req.headers["x-api-key"]; //convert key to small case because it will only accept smallcase

    //If no token is present in the request header return error
    if (!token)
      return res.status(400).send({
        status: false,
        msg: "Login is required",
      });

    //>>>>>>>>>>>>>>>>Authentication

    // Checking if the token is creted using the secret key provided and decode it.
    let decodedToken = jwt.verify(token, "jktyagi");

    // if cannot verify, will return error
    if (!decodedToken)
      return res.status(401).send({
        status: false,
        msg: "Token is invalid",
      });

    next();
  } catch (err) {
    res.status(500).send({
      msg: "Please try again later",
      error: err.message,
    });
  }
};

//        Authorization

const authorization = async function (req, res, next) {
  try {
    // check if token key is present in the header/cookies
    let token = req.headers["x-Api-key"];
    if (!token) token = req.headers["x-api-key"]; //convert key to small case because it will only accept smallcase

    // Checking if the token is creted using the secret key provided and decode it.
    let decodedToken = jwt.verify(token, "jktyagi");

    //---------------Authorisation
    let userToBeModified = req.body.userId; //storing the authorid entered in the request/postman body in a variable
    let userLoggedIn = decodedToken.userId; // storing the authorid from decoded token in a variable

    //userId comparision to check if the logged-in user is requesting for their own data.
    if (userToBeModified != userLoggedIn)
      //compared if enterd authorid and decoded token authorid is same or not
      return res.status(403).send({
        status: false,
        msg: "Not Authorized. User logged is not allowed to modify the requested users data",
      });

    next();
  } catch (err) {
    res.status(500).send({
      msg: "Serverside Errors. Please try again later",
      error: err.message,
    });
  }
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

module.exports = { authentication, authorization };

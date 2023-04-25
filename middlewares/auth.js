const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");

exports.auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({
        error: {
          message: `Unauthorized.Please Send token in request header`,
        },
      });
    }

    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log({ userId });

    req.userId = userId;

    next();
  } catch (error) {
    return res.status(401).send({ error: { message: `Unauthorized` } });
  }
};



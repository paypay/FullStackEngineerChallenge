const jwt = require("jsonwebtoken");
const ro = require("../helpers/response-object");

module.exports = (authorization) => {
  const token = authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET);
      return decoded;
    } catch (e) {
      console.error("Failed to authenticate token.");
    }
  } else {
    console.error("No token provided.");
  }
};

var jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;

function signToken(data) {
  var token = jwt.sign(data, SECRET);
  return token;
}
function decodedToken(token) {
  const data = jwt.verify(token, SECRET);
  return data;
}

module.exports = {
  signToken,
  decodedToken,
};

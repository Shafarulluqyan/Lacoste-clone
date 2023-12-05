const { decodedToken } = require("../helpers/jwt");
const { User } = require("../models"); 

async function authenticationUser(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      return res.status(401).json({ message: "Invalid Token" }); 
    }

    const decoded = decodedToken(access_token);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid Token" }); 
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authenticationUser };

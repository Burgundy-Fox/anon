const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(payload) {
  const token = jwt.sign(payload, SECRET_KEY);

  return token;
}

function decodeToken(token) {
  // verify a token symmetric - synchronous
  const decoded = jwt.verify(token, SECRET_KEY);

  return decoded;
}

module.exports = {
  generateToken,
  decodeToken,
};

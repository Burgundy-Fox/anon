const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = process.env.PRIVATE_KEY;

function passwordHasher(password) {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
}

function passwordDecoder(userPassword, dbPassword) {
  return bcrypt.compareSync(userPassword, dbPassword);
}

function tokenGenerator(payload) {
  const access_token = jwt.sign(payload, PRIVATE_KEY);
  return access_token;
}

function tokenDecoder(access_token) {
  const decoded_token = jwt.verify(access_token, PRIVATE_KEY);
  return decoded_token;
}

module.exports = {
  passwordHasher,
  passwordDecoder,
  tokenGenerator,
  tokenDecoder,
};

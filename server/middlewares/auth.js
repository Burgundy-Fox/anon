const { tokenDecoder } = require("../helpers");
const { User, Hiss } = require("../models");

function authentication(req, res, next) {
  const { access_token } = req.headers;

  if (!access_token) {
    return res.status(401).json("Access token missing");
  }

  try {
    const userDecoded = tokenDecoder(access_token);

    User.findByPk(userDecoded.id)
      .then((user) => {
        if (!user) {
          return res.status(401).json("Unauthenticated");
        } else {
          req.currentUser = {
            id: user.id,
          };
          next();
        }
      })
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    return res.status(500).json(error);
  }
}

function authorization(req, res, next) {
  let id = req.currentUser.id
  Hiss.findOne({ where: { id: req.params.id } })
    .then((hiss) => {
      if(hiss) {
        if (hiss.UserId == id) {
          next()
        } else {
          throw "Unauthorized"
        }
      } else {
        throw "Not Found"
      }
    })
    .catch((err) => res.status(401).json(err) )
}

module.exports = {
  authentication,
  authorization,
};

const { tokenDecoder } = require("../helpers");
const { User, Hiss } = require("../models");

function authentication(req, res, next) {
  const { access_token } = req.headers;

  if (!access_token) {
    return res.status(401).json("Access token missing");
  }

  try {
    const userDecoded = tokenDecoder(access_token);

    console.log(userDecoded, "auth");

    User.findByPk(userDecoded.id)
      .then((user) => {
        if (!user) {
          return res.status(401), json("Unauthenticated");
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
  const { id } = req.params;

  Hiss.findByPk(id)
    .then((hiss) => {
      if (!hiss) {
        return res.status(404).json("Data Not Found");
      } else {
        if (hiss.UserId == req.currentUser.id) {
          next();
        } else {
          return res.status(401).json("Unauthorized");
        }
      }
    })
    .catch((err) => res.status(500).json(err));
}

module.exports = {
  authentication,
  authorization,
};

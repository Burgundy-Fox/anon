const { tokenDecoder } = require("../helpers");
const { User } = require("../models");

function authentification(req, res, next) {
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
  if (req.currentUser.id === +req.params.id) {
    next();
  } else {
    return res.status(401).json("Unauthorized");
  }
}

module.exports = {
  authentification,
  authorization,
};

const { tokenDecoder } = require("../helpers");
const { User, Hiss } = require("../models");

function authentication(req, res, next) {
  const { access_token } = req.headers;

  if (!access_token) {
    throw ({ name: 'JsonWebTokenError' })
  }

  try {
    const userDecoded = tokenDecoder(access_token);

    User.findByPk(userDecoded.id)
      .then((user) => {
        if (!user) {
          /* istanbul ignore next */
          throw ({ name: "authentication error" })
        } else {
          req.currentUser = {
            id: user.id,
          };
          next();
        }
      })
      .catch((error) => {
        /* istanbul ignore next */
        next(error)
      });
  } catch (error) {
    /* istanbul ignore next */
    return next(error);
  }
}

function authorization(req, res, next) {
  let id = req.currentUser.id
  Hiss.findOne({ where: { id: req.params.id } })
    .then((hiss) => {
      if (hiss) {
        if (hiss.UserId == id) {
          next()
        } else {
            /* istanbul ignore next */
          throw ({ name: "authorization error" })
        }
      } else {
        throw ({ name: "not found" })
      }
    })
    .catch((err) => next(err))
}

module.exports = {
  authentication,
  authorization,
};

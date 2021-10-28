const { Like } = require('../models')

class LikeController {
  static LikeHiss(req, res, next) {

    Like.findAll({
      where: {
        UserId: req.currentUser.id,
        HissId: req.params.hissId
      }
    })
      .then((result) => {
        if (!result.length) {
          let input = {
            UserId: req.currentUser.id,
            HissId: req.params.hissId
          }
          Like.create(input)
            .then((result) => {
              res.status(201).json({ message: 'Like Success' })
            }).catch((err) => {
              /* istanbul ignore next */
              throw ({ name: 'Not Found' })
            });
        } else {
          throw ({ name: 'Already Liked' })
        }
      }).catch((err) => {
        next(err)
      });
  }
}

module.exports = LikeController

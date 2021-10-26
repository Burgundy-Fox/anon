const { User, Hiss } = require("../models");

class HissController {
  static createHiss(req, res, next) {
    const input = {
      content: req.body.content,
      image_url: req.image_url || null,
      like: 0,
      UserId: +req.currentUser.id,
    };

    Hiss.create(input)
      .then((hiss) => res.status(201).json(hiss))
      .catch((error) => next(error));
  }

  static getAllHiss(req, res, next) {
    Hiss.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
        },
      ],
    })
      .then((hisses) => res.status(200).json(hisses))
      .catch((error) => {
        /* istanbul ignore next */
        next(error)
      });
  }

  static getHissById(req, res, next) {
    Hiss.findAll({ where: { UserId: req.params.id } })
      .then((hiss) => res.status(200).json(hiss))
      .catch((error) => {
        /* istanbul ignore next */
        next(error)
      });
  }

  static updateLikeHiss(req, res, next) {
    const id = +req.params.id;

    Hiss.update(
      { like: +req.body.like },
      {
        where: {
          id,
        },
        returning: true,
      }
    )
      .then((hiss) => {
        const resultUpdateLikeHiss = hiss[1][0];

        return res.status(200).json(resultUpdateLikeHiss);
      })
      .catch((error) => {
        /* istanbul ignore next */
        next(error)
      });
  }

  static updateHiss(req, res, next) {
    const id = +req.params.id;

    Hiss.update(
      { content: req.body.content, image_url: req.body.image_url },
      {
        where: {
          id,
        },
        returning: true,
      }
    )
      .then((hiss) => {
        const resultUpdateHiss = hiss[1][0];
        return res.status(200).json(resultUpdateHiss);
      })
      .catch((error) => {
        next(error)
      });
  }

  static deleteHiss(req, res, next) {
    const id = +req.params.id;

    Hiss.destroy({
      where: { id },
      returning: true,
    })
      .then(() => {
        return res.status(200).json({
          success_message: "Data deleted successfully",
        });
      })
      .catch((error) => {
        /* istanbul ignore next */
        next(error)
      });
  }
}

module.exports = HissController;

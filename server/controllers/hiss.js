const { User, Hiss, Like } = require("../models");

class HissController {
  static createHiss(req, res, next) {
    // console.log(req.file);
    const input = {
      content: req.body.content,
      image_url: req.image_url || null,
      like: 0,
      UserId: +req.currentUser.id,
    };
    Hiss.create(input)
      .then((hiss) => res.status(201).json(hiss))
      .catch((error) => {
        next(error)
      });
  }

  static getAllHiss(req, res, next) {
    Hiss.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          include: ["Transactions"],
        },
        {
          model: Like,
          attributes: {
            exclude: ["HissId"],
          },
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
    Hiss.findByPk(Number(req.params.id))
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
        if (hiss[0]) {
          const resultUpdateLikeHiss = hiss[1][0];
          return res.status(200).json(resultUpdateLikeHiss);
        } else {
          /* istanbul ignore next */
          throw "id not found!";
        }
      })
      .catch((error) => {
        /* istanbul ignore next */

        next(error)
      });
  }

  static updateHiss(req, res, next) {
    const id = +req.params.id;
    Hiss.update(
      { content: req.body.content },
      {
        where: {
          id,
        },
        returning: true,
      }
    )
      .then((hiss) => {
        if (hiss[0]) {
          const resultUpdateHiss = hiss[1][0];

          return res.status(200).json(resultUpdateHiss);
        } else {
          /* istanbul ignore next */
          throw "id not found!";
        }
      })
      .catch((error) => {
        next(error)
      });
  }

  static deleteHiss(req, res, next) {
    const id = +req.params.id;

    Like.destroy({
      where: {
        HissId: id,
      },
      returning: true,
    })
      .then((result) => {
        Hiss.destroy({
          where: { id },
          returning: true,
        })
          .then((hiss) => {
            if (hiss) {
              return res.status(200).json({
                success_message: "Data deleted successfully",
              });
            } else {
              /* istanbul ignore next */

              throw ({ name: "failed" });
            }
          })
          .catch((error) => {
            /* istanbul ignore next */

            next(error)
          });
      })
      .catch((err) => {
        /* istanbul ignore next */

        next(error);
      });
  }
}

module.exports = HissController;

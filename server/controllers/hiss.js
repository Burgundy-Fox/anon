const { User, Hiss } = require("../models");

class HissController {
  static createHiss(req, res) {
    // console.log(req.file);
    const input = {
      content: req.body.content,
      image_url: req.image_url || null,
      like: 0,
      UserId: +req.currentUser.id,
    };

    Hiss.create(input)
      .then((hiss) => res.status(201).json(hiss))
      .catch((error) => res.status(500).json(error));
  }

  static getAllHiss(req, res) {
    Hiss.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
        },
      ],
    })
      .then((hisses) => res.status(200).json(hisses))
      .catch((error) => res.status(500).json(error));
  }

  static getHissById(req, res) {
    Hiss.findByPk(Number(req.params.id))
      .then((hiss) => res.status(200).json(hiss))
      .catch((error) => res.status(500).json(error));
  }

  static updateLikeHiss(req, res) {
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
          throw "id not found!";
        }
      })
      .catch((error) => res.status(500).json({ error }));
  }

  static updateHiss(req, res) {
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
        if (hiss[0]) {
          const resultUpdateHiss = hiss[1][0];

          return res.status(200).json(resultUpdateHiss);
        } else {
          throw "id not found!";
        }
      })
      .catch((error) => res.status(500).json({ error }));
  }

  static deleteHiss(req, res) {
    const id = +req.params.id;

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
          return res.status(500).json(error);
        }
      })
      .catch((error) => res.status(500).json(error));
  }
}

module.exports = HissController;

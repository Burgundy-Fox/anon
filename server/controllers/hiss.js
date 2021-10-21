const { Hiss } = require("../models");

class HissController {
  static createHiss(req, res) {
    const input = {
      content: req.body.content,
      image_url: req.body.image_url,
      like: 0,
      UserId: +req.currentUser.id,
    };

    Hiss.create(input)
      .then((hiss) => res.status(201).json(hiss))
      .catch((error) => res.status(500).json(error));
  }

  static getAllHiss(req, res) {
    Hiss.findAll({
      order: [["id", "ASC"]],
    })
      .then((hisses) => res.status(200).json(hisses))
      .catch((error) => res.status(500).json(error));
  }

  static getHissById(req, res) {
    Hiss.findAll({where: {UserId : req.params.id}})
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
        const resultUpdateLikeHiss = hiss[1][0];

        return res.status(200).json(resultUpdateLikeHiss);
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
        const resultUpdateHiss = hiss[1][0];
        return res.status(200).json(resultUpdateHiss);
      })
      .catch((error) => res.status(500).json({ error }));
  }

  static deleteHiss(req, res) {
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
      .catch((error) => res.status(500).json(error));
  }
}

module.exports = HissController;

const { Post } = require("../models");

class PostController {
  static createPost(req, res) {
    const input = {
      content: req.body.content,
      image_url: req.body.image_url,
      UserId: +req.body.UserId,
    };

    Product.create(input)
      .then((post) => res.status(201).json({ data: post }))
      .catch((err) => res.status(500).json({ error: err }));
  }

  static getAllPosts(req, res) {
    Post.findAll({
      order: [["id", "ASC"]],
    })
      .then((posts) => res.status(200).json({ data: posts }))
      .catch((err) => res.status(500).json({ error: err }));
  }

  static getPostById(req, res) {
    Post.findByPk(Number(req.params.id))
      .then((post) => res.status(200).json({ data: post }))
      .catch((err) => res.status(500).json({ error: err }));
  }

  static updatePost(req, res) {
    const id = +req.params.id;

    const input = {
      content: req.body.content,
      image_url: req.body.image_url,
      UserId: +req.body.UserId,
    };

    Post.update(
      { input },
      {
        where: {
          id,
        },
        returning: true,
      }
    )
      .then((post) => {
        if (post[0]) {
          const resultUpdatePost = post[1][0];

          return res.status(200).json({ data: resultUpdatePost });
        } else {
          return res.status(500).json({ error: err });
        }
      })
      .catch((err) => res.status(500).json({ error: err }));
  }

  static deletePost(req, res) {
    const id = +req.params.id;

    Post.destroy({
      where: { id },
      returning: true,
    })
      .then((post) => {
        if (post) {
          return res.status(200).json({
            success_message: "Data deleted successfully",
          });
        } else {
          return res.status(500).json({ error: err });
        }
      })
      .catch((err) => res.status(500).json({ error: err }));
  }
}

module.exports = PostController;

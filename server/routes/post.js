const router = require("express").Router();

const postControllers = require("../controllers/post");

router.post("/", postControllers.createPost);
router.get("/", postControllers.getAllPosts);
router.get("/:id", postControllers.getPostById);
router.put("/:id", postControllers.updatePost);
router.delete("/:id", postControllers.deletePost);

module.exports = router;

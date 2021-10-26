const router = require("express").Router();
const likeController = require("../controllers/LikeController");

const { authorization, authentication } = require("../middlewares/auth");

router.use(authentication);

// router.get("/", hissControllers.getAllHiss);
router.post("/:hissId", likeController.LikeHiss);

module.exports = router;

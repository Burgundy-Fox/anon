const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const hissControllers = require("../controllers/hiss");

const { uploadImage } = require("../middlewares/imageKit");
const { authorization, authentication } = require("../middlewares/auth");

router.use(authentication);
router.post(
  "/",
  upload.single("image"),
  uploadImage,
  hissControllers.createHiss
);
router.get("/", hissControllers.getAllHiss);
router.get("/:id", authorization, hissControllers.getHissById);
router.put("/:id", authorization, hissControllers.updateHiss);
router.patch("/:id", authorization, hissControllers.updateLikeHiss);
router.delete("/:id", authorization, hissControllers.deleteHiss);

module.exports = router;

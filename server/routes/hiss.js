const router = require("express").Router();

const hissControllers = require("../controllers/hiss");
const { authorization, authentication } = require("../middlewares/auth");

router.use(authentication)
router.post("/", hissControllers.createHiss);
router.get("/", hissControllers.getAllHiss);
router.get("/:id", authorization, hissControllers.getHissById);
router.put("/:id", authorization, hissControllers.updateHiss);
router.patch("/:id", authorization, hissControllers.updateLikeHiss);
router.delete("/:id", authorization, hissControllers.deleteHiss);

module.exports = router;

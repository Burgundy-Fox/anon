const router = require("express").Router();

const { authentification } = require("../middlewares/auth");
const hissRoutes = require("./hiss");

router.use(authentification);
router.use("/hisses", hissRoutes);

module.exports = router;

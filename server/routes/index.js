const router = require("express").Router();
const { authentification } = require("../middlewares/auth");
const hissRoutes = require("./hiss");
const transactionRoutes = require('./transaction')

router.use(authentification);
router.use("/hisses", hissRoutes);
router.use('/transaction', transactionRoutes)

module.exports = router;
const router = require("express").Router();
const hissRoutes = require("./hiss");
const transactionRoutes = require('./transaction')
const userRoutes = require('./user.js')

router.use("/user", userRoutes)
router.use("/hisses", hissRoutes);
router.use('/transaction', transactionRoutes)

module.exports = router;
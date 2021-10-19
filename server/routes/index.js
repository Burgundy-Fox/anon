const router = require("express").Router();
const hissRoutes = require("./hiss");
const transactionRoutes = require('./transaction')

router.use("/hisses", hissRoutes);
router.use('/transaction', transactionRoutes)

module.exports = router;
const router = require("express").Router();
const hissRoutes = require("./hiss");
const transactionRoutes = require('./transaction')
const userRoutes = require('./user.js')
const likeRoutes = require('./like')

router.use("/user", userRoutes)
router.use("/hisses", hissRoutes);
router.use('/transaction', transactionRoutes)
router.use('/like', likeRoutes)

module.exports = router;
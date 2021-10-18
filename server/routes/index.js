const router = require("express").Router();

const postRoutes = require("./post");

router.use("/posts", postRoutes);

module.exports = router;

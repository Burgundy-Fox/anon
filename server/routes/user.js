const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { authentication } = require("../middlewares/auth");

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.patch('/user/:id', UserController.updateAvatar)
router.patch('/user/add-wallet/:id', UserController.addWallet)
router.patch('/user/buy-item/:id', UserController.buyItem)

module.exports= router
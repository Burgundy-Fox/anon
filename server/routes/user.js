const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { authentication } = require("../middlewares/auth");

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.get('/', UserController.getUserDetails)
router.patch('/:id', UserController.updateAvatar)
router.patch('/buy-item/:id', UserController.buyItem)

module.exports= router
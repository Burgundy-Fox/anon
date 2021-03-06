const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { authentication } = require("../middlewares/auth");

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.get('/', UserController.getUserDetails)
router.patch('/', UserController.updateAvatar)

module.exports= router
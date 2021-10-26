const { User } = require('../models')
const { passwordDecoder, tokenGenerator } = require('../helpers/index')

class UserController {
    static async register(req, res, next) {
        const random = Math.floor(Math.random() * 10000)
        const { email, username, password } = req.body
        try {
            const user = await User.create({
                username,
                email,
                password,
                avatar: `https://robohash.org/anon-${random}`,
                wallet: 0
            })
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                wallet: user.wallet
            })
        } catch (error) {
           next(error)
        }
    }

    static async login(req, res, next) {
        const { username, password } = req.body
        try {
            const user = await User.findOne({
                where: {
                    username,
                },
            })
            if (!user) throw ({ name: 'authentication error' })
            const isCorrect = passwordDecoder(password, user.password)

            if (!isCorrect) throw ({ name: 'login failed' })
            const access_token = tokenGenerator({
                id: user.id,
                username: user.username,
            })

            res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                wallet: user.wallet,
                access_token: access_token,
            })
        } catch (error) {
          console.log(error);
           next(error)
        }
    }

    static updateAvatar(req, res) {
        const random = Math.floor(Math.random() * 10000)
        const avatar = `https://robohash.org/anon-${random}`
        const price = 5000

        User.findOne({
            where: {
                id: req.currentUser.id
            }
        })
            .then(({ wallet }) => {
                if (wallet < 5000) {
                    res.status(400).json({ message: 'Please Top up First' })
                } else {
                    User.decrement('wallet', {
                        by: price,
                        where: {
                            id: req.currentUser.id
                        }
                    })
                        .then((result) => {
                            User.update({ avatar }, {
                                where: {
                                    id: req.currentUser.id
                                },
                                returning: true
                            })
                                .then((user) => {
                                    res.status(200).json({
                                        id: user[1][0].id,
                                        username: user[1][0].username,
                                        email: user[1][0].email,
                                        avatar: user[1][0].avatar,
                                        wallet: user[1][0].wallet
                                    })
                                }).catch((err) => {
                                    throw err
                                });
                        }).catch((err) => {
                            throw err
                        });
                }
            }).catch((err) => {
                res.status(500).json(err)
            });


    }

    static getUserDetails(req, res, next) {
        User.findOne({
            where: {
                id: req.currentUser.id
            },
            attributes: { exclude: ['password'] }
        })
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json(err)
            });
    }
}

module.exports = UserController

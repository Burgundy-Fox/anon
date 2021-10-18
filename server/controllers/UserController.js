const { User } = require('../models')
const { passwordDecoder, tokenGenerator } = require('../helpers/index')

class UserController {
    static async register(req, res) {
        const { email, username, password } = req.body
   
        const random = Math.floor(Math.random() * 10000)
   
        try {
            const user = await User.create({
                username,
                email,
                password,
                avatar: `https://avatars.dicebear.com/api/bottts/anon-${random}.svg`,
            })
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    }

    static async login(req, res) {
        const { username, password } = req.body
        try {
            const user = await User.findOne({
                where: {
                    username,
                },
            })
            if (!user) throw { error: 'User doesnt exist!' }
            const isCorrect = passwordDecoder(password, user.password)

            if (!isCorrect) throw { error: 'Wrong Password!' }
            const access_token = tokenGenerator({
                id: user.id,
                username: user.username,
            })

            res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                access_token: access_token,
            })
        } catch (error) {
            res.status(500).json({
                error,
            })
        }
    }
}

module.exports = UserController

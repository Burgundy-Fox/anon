const { User } = require('../models')
const { passwordDecoder, tokenGenerator } = require('../helpers/index')

class UserController {
    static async register(req, res, next) {
        const { email, username, password } = req.body
   
        const random = Math.floor(Math.random() * 10000)
   
        try {
            const user = await User.create({
                username,
                email,
                password,
                avatar: `https://avatars.dicebear.com/api/bottts/anon-${random}.svg`,
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

    static async updateAvatar (req, res, next) {
        const id = +req.params.id
        const avatar = req.body.avatar
        
        try {
            const user = await User.update({ avatar }, {
                where: {
                    id: id
                }, 
                returning: true
            })

            if (user[0] === 0) throw { name: 'update failed' }
            res.status(200).json({
                id: user[1][0].id,
                username: user[1][0].username,
                email: user[1][0].email,
                avatar: user[1][0].avatar,
                wallet: user[1][0].wallet
            })
            
        } catch (error) {
           next(error)
        }
    }

    static async buyItem(req, res, next) {
        const id =  +req.params.id
        const price = +req.body.price

        try {
            const user = await User.decrement('wallet', { 
                by: price,
                where: {
                    id
                }
            })
            if (user[0][1] === 0) throw { name: 'authentication error' }
            res.status(200).json({
                id: user[0][0][0].id,
                username: user[0][0][0].username,
                email: user[0][0][0].email,
                wallet: user[0][0][0].wallet
            })
        } catch (error) {
           next(error)
        }
    }
}

module.exports = UserController

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
            res.status(500).json(error)
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
                wallet: user.wallet,
                access_token: access_token,
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async updateAvatar (req, res) {
        const id = +req.params.id
        const avatar = req.body.avatar
        
        try {
            const user = await User.update({ avatar }, {
                where: {
                    id: id
                }, 
                returning: true
            })
    
            res.status(200).json({
                id: user[1][0].id,
                username: user[1][0].username,
                email: user[1][0].email,
                avatar: user[1][0].avatar,
                wallet: user[1][0].wallet
            })
            
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async addWallet(req, res) {
        const id = +req.params.id
        const wallet = +req.body.wallet
     
        try {
            const user = await User.increment('wallet', { 
                by: wallet,
                where: {
                    id
                }
            })
         
            res.status(200).json({
                id: user[0][0][0].id,
                username: user[0][0][0].username,
                email: user[0][0][0].email,
                wallet: user[0][0][0].wallet
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

   
    static async buyItem(req, res) {
        const id =  +req.params.id
        const price = +req.body.price

        try {
            const user = await User.decrement('wallet', { 
                by: price,
                where: {
                    id
                }
            })
            res.status(200).json({
                id: user[0][0][0].id,
                username: user[0][0][0].username,
                email: user[0][0][0].email,
                wallet: user[0][0][0].wallet
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = UserController

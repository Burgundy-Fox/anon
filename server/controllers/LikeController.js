const { Like } = require('../models')

class LikeController {
    static LikeHiss (req, res, next){

        Like.findAll({
            where: {
                UserId : req.currentUser.id,
                HissId : req.params.hissId
            }
        })
        .then((result) => {
            if(!result.length){
                let input = {
                    UserId : req.currentUser.id,
                    HissId : req.params.hissId
                }
                Like.create(input)
                .then((result) => {
                    res.status(201).json({ message : 'Like Success'})
                }).catch((err) => {
                    throw err
                });
            }else{
                res.status(400).json({message : 'Already Liked'})
            }
        }).catch((err) => {
            res.status(500).json(err)
        });
    }
}   

module.exports = LikeController

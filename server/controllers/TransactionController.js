const { Transaction } = require('../models')
const midtransClient = require('midtrans-client');

let snap = new midtransClient.Snap({
    isProduction : false,
    serverKey : process.env.MIDTRANS_SERVER_KEY,
    clientKey : process.env.MIDTRANS_CLIENT_KEY
});

class Controller {
    static createPaymentToken(req, res, next){

        let parameter = {
            "transaction_details": {
                "order_id": req.body.order_id,
                "gross_amount": req.body.price
            }, "credit_card":{
                "secure" : true
            }
        }

        snap.createTransaction(parameter)
            .then((transaction)=>{
                // transaction token
                res.status(200).json({transaction});
            })
            .catch(err => {
                console.log(err);
            })
    }

    static createTransaction(req, res, next){
        let recipeId = req.body.order_id.split('TOPBUG')[0]
        let input = {
            order_id : req.body.order_id,
            status : req.body.transaction_status,
            userId : req.currentUser.id,
            recipeId,
        }
        Transaction.create(input)
        .then((result) => {
            res.status(201).json(result)
        }).catch((err) => {
            next(err)
        });
    }

    static viewTransactions(req, res, next){
        Transaction.findAll({
            where : {
                userId : req.currentUser.id,
            },
            order: [['createdAt', 'DESC']],
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            next(err)
        });
    }

    // static updateTransactions(req, res, next){
    //     snap.transaction.status(req.transactionData.order_id)
    //     .then((response)=>{
    //         if(response.transaction_status !== 'pending'){
    //             let input = {
    //                 status : 'settlement'
    //             }
    //             Transaction.update(input, {
    //                 where : {
    //                     id : req.params.transactionId
    //                 }
    //             })
    //             .then((result) => {
    //                 if (result[0]) res.status(200).json({
    //                     message : 'Transaction succesfully updated'
    //                 });
    //                 else next({ name: "Transaction Not Found" });
    //             }).catch((err) => {
    //                 next(err)
    //             });
    //         }else{
    //             res.status(202).json({
    //                 message : "Transaction isn't payed yet"
    //             })
    //         }
    //     })
    //     .catch(err => next(err))
    // }
}

module.exports = Controller
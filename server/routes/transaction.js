const router = require("express").Router();

const TransactionController = require("../controllers/TransactionController");

router.post('/midtransToken', TransactionController.midtransToken)
router.post('/', TransactionController.createTransaction)
router.get('/', TransactionController.viewTransactions)
// router.patch('/:transactionId', authorization, TransactionController.updateTransactions)

module.exports = router;
const router = require("express").Router();
const { authentication } = require("../middlewares/auth");
const TransactionController = require("../controllers/TransactionController");

// ini buat midtrans ke server kita
router.post('/', TransactionController.createTransaction)

router.use(authentication)
router.post('/midtransToken', TransactionController.midtransToken)
router.get('/', TransactionController.viewTransactions)

module.exports = router;
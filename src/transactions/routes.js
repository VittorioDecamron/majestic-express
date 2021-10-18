const {Router } = require('express');
const controllers = require('./controllers')


const router = Router();

router.get('/', controllers.getTransactions);
// router.get('/', (req, res) => {
//     res.send("using api route");
// });

// create a transaction
router.post('/', controllers.addTransaction);

// get a single transaction by id 
router.get('/:id', controllers.getTransactionById);

//updating transaction
router.put('/:id', controllers.modifyTransaction);

//deleting an transaction
router.delete('/:id', controllers.deleteTransaction);



module.exports = router;
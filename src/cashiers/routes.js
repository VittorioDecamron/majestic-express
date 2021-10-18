const {Router } = require('express');
const controllers = require('./controllers')


const router = Router();

router.get('/', controllers.getCashiers);
// router.get('/', (req, res) => {
//     res.send("using api route");
// });

// create a cashier     
router.post('/', controllers.addCashier);

// get a single cashier by id 
router.get('/:id', controllers.getCashierById);

//updating cashier      
router.put('/:id', controllers.modifyCashier);

//deleting an cashier   
router.delete('/:id', controllers.deleteCashier);



module.exports = router;
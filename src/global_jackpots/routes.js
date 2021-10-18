const {Router } = require('express');
const controllers = require('./controllers')


const router = Router();

router.get('/', controllers.getGlobalJackots);
// router.get('/', (req, res) => {
//     res.send("using api route");
// });

// create a globalJackpot   
router.post('/', controllers.addGlobalJackpot);

// get a single user by id 
router.get('/:id', controllers.getGlobalJackpotById);

//updating globaljackpot    
router.put('/:id', controllers.modifyGlobalJackpot);

//deleting an globalJackpot
router.delete('/:id', controllers.deleteGlobalJackpot);



module.exports = router;
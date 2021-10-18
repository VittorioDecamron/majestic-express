const {Router } = require('express');
const controllers = require('./controllers')


const router = Router();

router.get('/', controllers.getLocalJackpots);
// router.get('/', (req, res) => {
//     res.send("using api route");
// });

// create a localjackpot    
router.post('/', controllers.addLocalJackpot);

// get a single localjackpot by id 
router.get('/:id', controllers.getLocalJackpotById);

//updating localjackpot 
router.put('/:id', controllers.modifyLocalJackpot);

//deleting an localjackpot
router.delete('/:id', controllers.deleteLocalJackpot);



module.exports = router;
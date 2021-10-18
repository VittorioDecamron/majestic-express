const {Router } = require('express');
const controllers = require('./controllers')


const router = Router();

router.get('/', controllers.getGames);
// router.get('/', (req, res) => {
//     res.send("using api route");
// });

// create a game
router.post('/', controllers.addGame);

// get a single game by id 
router.get('/:id', controllers.getGameById);

//updating game 
router.put('/:id', controllers.modifyGame);

//deleting an game  
router.delete('/:id', controllers.deleteGame);



module.exports = router;
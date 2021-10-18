const {Router } = require('express');
const controllers = require('./controllers')


const router = Router();

router.get('/', controllers.getWinHistories);
// router.get('/', (req, res) => {
//     res.send("using api route");
// });

// create a winhistory
router.post('/', controllers.addWinHistory);

// get a single winhistory by id 
router.get('/:id', controllers.getWinHistoryById);

//updating winhistory 
router.put('/:id', controllers.modifyWinHistory);

//deleting an winhistory
router.delete('/:id', controllers.deleteWinHistory);



module.exports = router;
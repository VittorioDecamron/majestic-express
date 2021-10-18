const {Router } = require('express');
const controllers = require('./controllers')


const router = Router();

router.get('/', controllers.getUsers);
// router.get('/', (req, res) => {
//     res.send("using api route");
// });

// create a user
router.post('/', controllers.addUser);

// get a single user by id 
router.get('/:id', controllers.getUserById);

//updating user 
router.put('/:id', controllers.modifyUser);

//deleting an user
router.delete('/:id', controllers.deleteUser);



module.exports = router;


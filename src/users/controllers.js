const pool = require('../../db');
const queries = require('./queries');



//getting all the users 
const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

//creating a user 
const addUser = (req, res) => {
    const { username, email, password, first_name, last_name, token_balance, pin, address, birth_date, sex, telephone} = req.body;

    //check to ensure email doesnt exist in db.
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.send("email already taken");
        }
        // add user to database
        pool.query(queries.addUser, [username, email, password, first_name, last_name, token_balance, pin, address, birth_date, sex, telephone], (error, results) => {
            if(error) throw error;
            res.status(201).send("User successfully created!");
        });
    });
};

//getting a specific user 
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

//delete a user 
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
//check to see if there is a user with that id
    pool.query(queries.getUserById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if (noUserFound) {
            res.send("User does not exist in database");
        };
// deleteing the found user with id
        pool.query(queries.deleteUser, [id], (error, results) => {
            if (error) throw error;
                res.status(200).send("User was deleted successfully.");
            });
        });
};

//updating user function
const modifyUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { username, email, password, first_name, last_name, token_balance, pin, address, birth_date, sex, telephone} = req.body;
//checking params for user id
    pool.query(queries.getUserById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if (noUserFound) {
            res.send("User does not exist in database");
    };

// updating the user 
    pool.query(queries.modifyUser, [username, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("User was updated Successfully");
    });
});
};



module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    modifyUser
};
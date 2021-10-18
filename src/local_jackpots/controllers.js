const pool = require('../../db');
const queries = require('./queries');



//getting localjackpots 
const getLocalJackpots = (req, res) => {
    pool.query(queries.getLocalJackpots, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

//creating a localJackpot
const addLocalJackpot = (req, res) => {
    const {won, current_value, user_id, win_history_id} = req.body;

    //check to current value doesnt exist in db.
    pool.query(queries.checkCurrentValueExists, [current_value], (error, results) => {
        if (results.rows.length) {
            res.send("current value already exist");
        }
        // add localjackpot to database
        pool.query(queries.addLocalJackpot, [won, current_value, user_id, win_history_id], (error, results) => {
            if(error) throw error;
            res.status(201).send("localJackpot successfully created!");
        });
    });
};

//getting a specific localjackpot 
const getLocalJackpotById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getLocalJackpotById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

//delete a localjackpot
const deleteLocalJackpot = (req, res) => {
    const id = parseInt(req.params.id);
//check to see if there is a localjackpot with that id
    pool.query(queries.getLocalJackpotById, [id], (error, results) => {
        const noLocalJackpotFound = !results.rows.length;
        if (noLocalJackpotFound) {
            res.send("LocalJackpot does not exist in database");
        };
// deleteing the found localJackpot with id
        pool.query(queries.deleteLocalJackpot, [id], (error, results) => {
            if (error) throw error;
                res.status(200).send("LocalJackpot was deleted successfully.");
            });
        });
};

//updating localjackpot function
const modifyLocalJackpot = (req, res) => {
    const id = parseInt(req.params.id);
    const { won, current_value, user_id, win_history_id} = req.body;
//checking params for localjackpot id
    pool.query(queries.getLocalJackpotById, [id], (error, results) => {
        const noLocalJackpotFound = !results.rows.length;
        if (noLocalJackpotFound) {
            res.send("localJackpot does not exist in database");
    };

// updating the user 
    pool.query(queries.modifyLocalJackpot, [current_value, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("localJackpot was updated Successfully");
    });
});
};



module.exports = {
    getLocalJackpots,
    getLocalJackpotById,
    addLocalJackpot,
    deleteLocalJackpot,
    modifyLocalJackpot
};
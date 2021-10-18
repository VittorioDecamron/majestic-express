const pool = require('../../db');
const queries = require('./queries');



//getting all the winhistories
const getWinHistories = (req, res) => {
    pool.query(queries.getWinHistories, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

//creating a winhistory 
const addWinHistory = (req, res) => {
    const {game_id, user_id, cashier_id, value} = req.body;

    //check to ensure value doesnt exist in db.
    pool.query(queries.checkValueExists, [value], (error, results) => {
        if (results.rows.length) {
            res.send("value already taken");
        }
        // add winhistory to database
        pool.query(queries.addWinHistory, [game_id, user_id, cashier_id, value], (error, results) => {
            if(error) throw error;
            res.status(201).send("successfully created!");
        });
    });
};

//getting a specific winhistory
const getWinHistoryById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getWinHistoryById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

//delete a winhistory 
const deleteWinHistory = (req, res) => {
    const id = parseInt(req.params.id);
//check to see if there is a winHistory with that id
    pool.query(queries.getWinHistoryById, [id], (error, results) => {
        const noWinHistoryFound = !results.rows.length;
        if (noWinHistoryFound) {
            res.send("does not exist in database");
        };
// deleteing the found winhistory with id
        pool.query(queries.deleteWinHistory, [id], (error, results) => {
            if (error) throw error;
                res.status(200).send("WinHistory was deleted successfully.");
            });
        });
};

//updating winhistory function
const modifyWinHistory = (req, res) => {
    const id = parseInt(req.params.id);
    const { game_id, user_id, cashier_id, value} = req.body;
//checking params for user id
    pool.query(queries.getWinHistoryById, [id], (error, results) => {
        const noWinHistoryFound = !results.rows.length;
        if (noWinHistoryFound) {
            res.send("does not exist in database");
    };

// updating the winhistory
    pool.query(queries.modifyWinHistory, [value, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("updated Successfully");
    });
});
};



module.exports = {
    getWinHistories,
    getWinHistoryById,
    addWinHistory,
    deleteWinHistory,
    modifyWinHistory
};
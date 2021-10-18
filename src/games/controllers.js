const pool = require('../../db');
const queries = require('./queries');



//getting all the games 
const getGames = (req, res) => {
    pool.query(queries.getGames, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

//creating a game 
const addGame = (req, res) => {
    const { name, status} = req.body;

    //check to ensure name doesnt exist in db.
    pool.query(queries.checkNameExists, [name], (error, results) => {
        if (results.rows.length) {
            res.send("Game already exists");
        }
        // add game to database
        pool.query(queries.addGame, [name, status], (error, results) => {
            if(error) throw error;
            res.status(201).send("Game successfully created!");
        });
    });
};

//getting a specific game 
const getGameById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getGameById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

//delete a game 
const deleteGame = (req, res) => {
    const id = parseInt(req.params.id);
//check to see if there is a game with that id
    pool.query(queries.getGameById, [id], (error, results) => {
        const noGameFound = !results.rows.length;
        if (noGameFound) {
            res.send("Game does not exist in database");
        };
// deleteing the found game with id
        pool.query(queries.deleteGame, [id], (error, results) => {
            if (error) throw error;
                res.status(200).send("Game was deleted successfully.");
            });
        });
};

//updating game function
const modifyGame = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, status} = req.body;
//checking params for game id
    pool.query(queries.getGameById, [id], (error, results) => {
        const noGameFound = !results.rows.length;
        if (noGameFound) {
            res.send("Game does not exist in database");
    };

// updating the game 
    pool.query(queries.modifyGame, [name, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Game was updated Successfully");
    });
});
};



module.exports = {
    getGames,
    getGameById,
    addGame,
    deleteGame,
    modifyGame
};
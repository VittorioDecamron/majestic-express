const pool = require('../../db');
const queries = require('./queries');



//getting all the global_jackpots 
const getGlobalJackots = (req, res) => {
    pool.query(queries.getGlobalJackots, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

//creating a globalJackpot
const addGlobalJackpot = (req, res) => {
    const { name, status} = req.body;

    //check to ensure won  in db.
    pool.query(queries.checkWinStatus, [won], (error, results) => {
        if (results.rows.length) {
            res.send("This  won ");
        }
        // add globaljackpot to database
        pool.query(queries.addGlobalJackpot, [won, current_value, user_id, win_history_id, black_tokens, silver_tokens, platinum_tokens, diamond_tokens], (error, results) => {
            if(error) throw error;
            res.status(201).send("GlobalJackpot successfully created!");
        });
    });
};

//getting a specific globalJackpot
const getGlobalJackpotById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getGlobalJackpotById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

//delete a globaljackpot
const deleteGlobalJackpot = (req, res) => {
    const id = parseInt(req.params.id);
//check to see if there is a globaljackpot with that id
    pool.query(queries.getGlobalJackpotById, [id], (error, results) => {
        const noGlobalJackpotFound = !results.rows.length;
        if (noGlobalJackpotFound) {
            res.send("That GlobalJackpot does not exist in database");
        };
// deleteing the found globaljackpot with id
        pool.query(queries.deleteGlobalJackpot, [id], (error, results) => {
            if (error) throw error;
                res.status(200).send("GlobalJAckpot was deleted successfully.");
            });
        });
};

//updating globaljackpot function
const modifyGlobalJackpot = (req, res) => {
    const id = parseInt(req.params.id);
    const {won, current_value, user_id, win_history_id, black_tokens, silver_tokens, platinum_tokens, diamond_tokens} = req.body;
//checking params for globaljackpot id
    pool.query(queries.getGlobalJackpotById, [id], (error, results) => {
        const noGlobalJackpotFound = !results.rows.length;
        if (noGlobalJackpotFound) {
            res.send("that Globaljackpot does not exist in database");
    };

// updating the globaljackpot 
    pool.query(queries.modifyGlobalJackpot, [current_value, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Globaljackpot was updated Successfully");
    });
});
};



module.exports = {
    getGlobalJackots,
    getGlobalJackpotById,
    addGlobalJackpot,
    deleteGlobalJackpot,
    modifyGlobalJackpot
};
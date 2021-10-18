const pool = require('../../db');
const queries = require('./queries');



//getting all the cashiers 
const getCashiers = (req, res) => {
    pool.query(queries.getCashiers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

//creating a cashier 
const addCashier = (req, res) => {
    const {name, deposit, redeem, profit, user_id, payout_percentage} = req.body;

    //check to ensure name doesnt exist in db.
    pool.query(queries.checkNameExist, [name], (error, results) => {
        if (results.rows.length) {
            res.send("name already taken");
        }
        // add cashier to database
        pool.query(queries.addCashier, [name, deposit, redeem, profit, user_id, payout_percentage], (error, results) => {
            if(error) throw error;
            res.status(201).send("Cashier successfully created!");
        });
    });
};

//getting a specific cashier 
const getCashierById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getCashierById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

//delete a cashier 
const deleteCashier = (req, res) => {
    const id = parseInt(req.params.id);
//check to see if there is a user with that id
    pool.query(queries.getCashierById, [id], (error, results) => {
        const noCashierFound = !results.rows.length;
        if (noCashierFound) {
            res.send("Cashier does not exist in database");
        };
// deleteing the found cashier with id
        pool.query(queries.deleteCashier, [id], (error, results) => {
            if (error) throw error;
                res.status(200).send("cashier was deleted successfully.");
            });
        });
};

//updating user function
const modifyCashier = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, deposit, redeem, profit, user_id, payout_percentage} = req.body;
//checking params for user id
    pool.query(queries.getCashierById, [id], (error, results) => {
        const noCashierFound = !results.rows.length;
        if (noCashierFound) {
            res.send("cashier does not exist in database");
    };

// updating the cashier 
    pool.query(queries.modifyCashier, [name, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Cashier was updated Successfully");
    });
});
};



module.exports = {
    getCashiers,
    getCashierById,
    addCashier,
    deleteCashier,
    modifyCashier
};
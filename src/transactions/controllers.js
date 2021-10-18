const pool = require('../../db');
const queries = require('./queries');



//getting all the transactions 
const getTransactions = (req, res) => {
    pool.query(queries.getTransactions, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

//creating a transactions
const addTransaction = (req, res) => {
    const {token_balance, pin, deposit, redeem, reverse, user_id, cashier_id} = req.body;

    //check to ensure token_balance doesnt exist in db.
    pool.query(queries.checkRedeemExists, [redeem], (error, results) => {
        if (results.rows.length) {
            res.send(" taken");
        }
        // add transactions to database
        pool.query(queries.addTransaction, [token_balance, pin, deposit, redeem, reverse, user_id, cashier_id], (error, results) => {
            if(error) throw error;
            res.status(201).send("successfully created!");
        });
    });
};

//getting a specific transaction 
const getTransactionById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getTransactionById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

//delete a transaction
const deleteTransaction = (req, res) => {
    const id = parseInt(req.params.id);
//check to see if there is a transaction with that id
    pool.query(queries.getTransactionById, [id], (error, results) => {
        const noTransactionFound = !results.rows.length;
        if (noTransactionFound) {
            res.send("does not exist in database");
        };
// deleteing the found transaction with id
        pool.query(queries.deleteTransaction, [id], (error, results) => {
            if (error) throw error;
                res.status(200).send("deleted successfully.");
            });
        });
};

//updating transaction function
const modifyTransaction = (req, res) => {
    const id = parseInt(req.params.id);
    const {token_balance, pin, deposit, redeem, reverse, user_id, cashier_id} = req.body;
//checking params for transaction  id
    pool.query(queries.getTransactionById, [id], (error, results) => {
        const noTransactionFound = !results.rows.length;
        if (noTransactionFound) {
            res.send("does not exist in database");
    };

// updating the transaction
    pool.query(queries.modifyTransaction, [token_balance, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("updated Successfully");
    });
});
};



module.exports = {
    getTransactions,
    getTransactionById,
    addTransaction,
    deleteTransaction,
    modifyTransaction
};
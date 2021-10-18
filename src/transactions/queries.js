const getTransactions = "SELECT * FROM transactions";
const getTransactionById = "SELECT * FROM transactions WHERE id = $1";
const checkRedeemExists = "SSELECT t FROM transactions t WHERE t.token_balance = $1";
const addTransaction = "INSERT INTO transactions (token_balance, pin, deposit, redeem, reverse, user_id, cashier_id ) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const deleteTransaction = "DELETE FROM transactions WHERE id = $1";
const modifyTransaction = "UPDATE transactions SET token_balance = $1 WHERE id = $2";

module.exports = {
    getTransactions,
    getTransactionById,
    checkRedeemExists,
    addTransaction,
    deleteTransaction,
    modifyTransaction
};
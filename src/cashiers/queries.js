const getCashiers = "SELECT * FROM cashiers";
const getCashierById = "SELECT * FROM cashiers WHERE id = $1";
const checkNameExists = "SELECT c FROM cashiers c WHERE c.deposit = $1";
const addCashier = "INSERT INTO cashiers (name, deposit, redeem, profit, user_id, payout_percentage ) VALUES ($1, $2, $3, $4, $5, $6)";
const deleteCashier = "DELETE FROM cashiers WHERE id = $1";
const modifyCashier = "UPDATE cashiers SET name = $1 WHERE id = $2";


module.exports = {

    getCashiers,
    getCashierById,
    checkNameExists,
    addCashier,
    deleteCashier,
    modifyCashier
};
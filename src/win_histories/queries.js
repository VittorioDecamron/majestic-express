const getWinHistories = "SELECT * FROM win_histories";
const getWinHistoryById = "SELECT * FROM win_histories WHERE id = $1";
const checkValueExists = "SELECT w FROM win_histories w WHERE w.value = $1";
const addWinHistory = "INSERT INTO win_histories (game_id, user_id, cashier_id, value) VALUES ($1, $2, $3, $4)";
const deleteWinHistory = "DELETE FROM win_histories WHERE id = $1";
const modifyWinHistory = "UPDATE win_histories SET value = $1 WHERE id = $2";


module.exports = {
    getWinHistories,
    getWinHistoryById,
    checkValueExists,
    addWinHistory,
    deleteWinHistory,
    modifyWinHistory
};
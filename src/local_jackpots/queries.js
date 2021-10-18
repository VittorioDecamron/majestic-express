const getLocalJackpots = "SELECT * FROM local_jackpots";
const getLocalJackpotById = "SELECT * FROM local_jackpots WHERE id = $1";
const checkCurrentValueExists = "SELECT l FROM local_jackpots l WHERE l.current_value = $1";
const addLocalJackpot = "INSERT INTO local_jackpots (won, current_value, user_id, win_history_id ) VALUES ($1, $2, $3, $4)";
const deleteLocalJackpot = "DELETE FROM local_jackpots WHERE id = $1";
const modifyLocalJackpot = "UPDATE local_jackpots SET current_value = $1 WHERE id = $2";


module.exports = {
    getLocalJackpots,
    getLocalJackpotById,
    checkCurrentValueExists,
    addLocalJackpot,
    deleteLocalJackpot,
    modifyLocalJackpot
};
const getGlobalJackots = "SELECT * FROM global_jackpots";
const getGlobalJackpotById = "SELECT * FROM global_jackpots WHERE id = $1";
const checkWinStatus = "SELECT gl FROM global_jackpots gl WHERE gl.current_value = $1";
const addGlobalJackpot = "INSERT INTO global_jackpots (won, current_value, user_id, win_history_id, black_tokens, silver_tokens, platinum_tokens, diamond_tokens ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
const deleteGlobalJackpot = "DELETE FROM global_jackpots WHERE id = $1";
const modifyGlobalJackpot = "UPDATE global_jackpots SET current_value = $1 WHERE id = $2";


module.exports = {
    getGlobalJackots,
    getGlobalJackpotById,
    checkWinStatus,
    addGlobalJackpot,
    deleteGlobalJackpot,
    modifyGlobalJackpot
};

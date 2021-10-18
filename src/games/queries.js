const getGames = "SELECT * FROM games";
const getGameById = "SELECT * FROM games WHERE id = $1";
const checkNameExists = "SELECT g FROM games g WHERE g.name = $1";
const addGame = "INSERT INTO games (name, status) VALUES ($1, $2)";
const deleteGame = "DELETE FROM games WHERE id = $1";
const modifyGame = "UPDATE games SET name = $1 WHERE id = $2";


module.exports = {
    getGames,
    getGameById,
    checkNameExists,
    addGame,
    deleteGame,
    modifyGame
};





   
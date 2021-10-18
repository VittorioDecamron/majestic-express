const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const checkEmailExists = "SELECT u FROM users u WHERE u.email = $1";
const addUser = "INSERT INTO users (username, email, password, first_name, last_name, token_balance, pin, address, birth_date, sex, telephone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
const deleteUser = "DELETE FROM users WHERE id = $1";
const modifyUser = "UPDATE users SET username = $1 WHERE id = $2";


module.exports = {
    getUsers,
    getUserById,
    checkEmailExists,
    addUser,
    deleteUser,
    modifyUser

};
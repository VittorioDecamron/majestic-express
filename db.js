const Pool = require('pg').Pool;
// const env = require('dotenv');

const pool = new Pool ({
    user: "postgres",
    password: "TEXAS",
    database: "majestic_arcade_db",
    host: "localhost",
    port: 5432
});

// const pool = new Pool ({
//     user: "doadmin",
//     pasword: "fYuRUgK3ONlizmMm",
//     database: "majestic-arcade-production",
//     host: "majestic-arcade-postgres-db-do-user-9122720-0.b.db.ondigitalocean.com",
//     port: 25061
// });

module.exports = pool;


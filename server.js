const express = require('express');
const usersRoutes = require('./src/users/routes.js');
const win_historiesRoutes = require('./src/win_histories/routes.js');
const gamesRoutes = require('./src/games/routes.js');
const cashiersRoutes = require('./src/cashiers/routes.js');
const global_jackpotsRoutes = require('./src/global_jackpots/routes.js');
const local_jackpotsRoutes = require('./src/local_jackpots/routes.js');
const transactionsRoutes = require('./src/transactions/routes.js');
// const env = require('dotenv');
const app = express();
const port = 8000;
// const port = 25061;


//user to format req.body
app.use(express.json());

// root path for app
app.get("/",(req, res) => {
    res.send("Welcome to Majestic Server Api Browser")
    console.log("Welcome to Majestic Server Api")
});

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/games', gamesRoutes);
app.use('/api/v1/cashiers', cashiersRoutes);
app.use('/api/v1/global_jackpots', global_jackpotsRoutes);
app.use('/api/v1/local_jackpots', local_jackpotsRoutes);
app.use('/api/v1/transactions', transactionsRoutes);
app.use('/api/v1/win_histories', win_historiesRoutes);


app.listen(port, () => { console.log(`Sever is currently running on port ${port}`)});


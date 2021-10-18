const express = require('express');
const app = express();
const port = 5000;
const pool = require("./db.js")

//user to format req.body
app.use(express.json());

// root path for app
app.get("/",(req, res) => {
    res.send("Welcome to Majestic Server Api Browser")
    console.log("Welcome to Majestic Server Api")
});

app.get("/users", async (req, res) => {
    const rows = await readUsers();
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(rows));
});

app.post("/users", async (req, res) => {
    let result = {}
    try{
        const reqJson = req.body;
        result.success = await createUser(reqJson.user)
    }
    catch(e){
        result.success=false;
    }
    finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
   
});

// app.post('/users', async(req, res) => {
//     try{
//         // console.log(req.body);
//         const { username } = req.body;
//         const { first_name } = req.body;
//         const { last_name } = req.body;
//         const { email } = req.body;
//         const { password } = req.body;
//         const { address } = req.body;
//         const { token_balance } = req.body;
//         const { pin } = req.body;
//         const { birth_date } = req.body;
//         const { sex } = req.body;

//         const newUser = await pool.query('INSERT INTO users (username, email, password) VALUE ($1, $2, $3) RETURNING'
//         [username, email, password]);

//         res.json(newUser);
//     }catch (err) {
//         console.log(err.message);

//     }
// });

start()

async function start() {
    await connect();
};

async function connect() {
    try {
        await pool.connect(); 
    }
    catch(e) {
        console.error(`Failed to connect ${e}`)
    }
};

async function readUsers() {
    try {
    const results = await pool.query("select id, text from users");
    return results.rows;
    }
    catch(e){
        return [];
    }
}

async function createUser(user){
    
    // userParams = [{
    //     "email": "john",
    //     "password": "123456",
    //     "username": "johnny"
    //     }];
    //     console.log(userParams);
    try {
        await pool.query("insert into users (user) values ($1)", [user]);
        return true
        }
        catch(e){
            return false;
        }
}


app.listen(port, () => { console.log(`sever is started on port ${5000}`)});

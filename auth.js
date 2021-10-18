const express = require('express');
const jwt = require('jsonwebtoken');
const usersRoutes = require('./src/users/routes.js');

const app = express();


app.get("/",(req, res) => {
    res.send("Welcome to Majestic Server Api Browser 5000")
    console.log("Welcome to Majestic Server  Api")
});

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

app.post('/api/v1/login', (req, res) => {
    // Mock user
    const user = {
      id: 1, 
      username: 'brad',
      email: 'brad@gmail.com'
    }
  
    jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
      res.json({
        token
      });
    });
  });

// router.get('/', controllers.getUsers);

app.post('/api/v1/users', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: 'got users...',
          authData
        });
      }
    });
});



// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    };
  
  };



app.listen(5000, () => console.log('Server started on port 5000'));
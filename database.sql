CREATE DATABASE majestic_arcade_db;

--\c into majestic_arcade_database
----------------------------------------USERS TABLE-------------------------------

CREATE TABLE users (
	ID SERIAL PRIMARY KEY,
	username VARCHAR(100),
	password VARCHAR(255),
	email VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    token_balance BIGINT,
    pin BIGINT,
    address VARCHAR(255),
    birth_date DATE,
    sex VARCHAR(50),
    telephone BIGINT
);

INSERT INTO users (username, email, password, first_name, last_name, token_balance, pin, address, birth_date, sex, telephone)
VALUES ('johnny', 'johnny@test.com', '12345678', 'john', 'test', 2500, 1020304050, 'somwhere around the world','1990/12/12', 'male', 7189875443 ),
('ceethai', 'cee@test.com', '12345678', 'Cee', 'Thai', 5500, 1020304060, 'somwhere around china','1980/05/10', 'female', 7185556343);
-- ('leechai', 'lee@test.com', '12345678', 'Lee', 'Chai', 6500, 1020304070, 'somwhere around DR','1950/05/10', 'female', 7545556343);

--\ get all users 
SELECT * FROM users;

--\c get a specific user 
SELECT * FROM users WHERE id = $1;

--\checking emails or properties of object
SELECT u FROM users u WHERE u.email = $1;

--\c adding a specific object
INSERT INTO users (username, email, password, first_name, last_name, token_balance, pin, address, birth_date, sex, telephone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);

--\c delete a item
DELETE FROM users WHERE id = $1;

---\c updating a user 
UPDATE users SET username = $1 WHERE id = $2;

--------------------------GAMES TABLE -----------------------

CREATE TABLE games (
	ID SERIAL PRIMARY KEY,
	name VARCHAR(100),
	status VARCHAR(255)
);

INSERT INTO games (name, status) 
VALUES ('Bingo', 'active'), ('Roulette', 'active'), ('BlackJack', 'active'), ('SpinWheel', 'active'), ('Slots', 'active');

--\ get all games 
SELECT * FROM games;

--\c get a specific game 
SELECT * FROM games WHERE id = $1;

--\checking name or properties of object/game
SELECT g FROM games g WHERE g.name = $1;

--\c adding a specific game
INSERT INTO games (name, status) VALUES ($1, $2);

--\c delete a game
DELETE FROM games WHERE id = $1;

----------------------------------Transactions Table -------------------------------

CREATE TABLE transactions (
	ID SERIAL PRIMARY KEY,
	token_balance BIGINT,
    pin BIGINT,
    deposit BIGINT,
    redeem BIGINT,
    reverse BOOLEAN,
    user_id INT,
    cashier_id INT
);

INSERT INTO transactions (token_balance, pin, deposit, redeem, reverse, user_id, cashier_id ) 
VALUES (2800, 1020304050, 5000, 1000, 'false', 1, 1), (3800, 1020304060, 6000, 200, 'false', 2, 1), (2000, 1020304070, 7000, 500, 'false', 3, 1);

--\ get all transactions
SELECT * FROM transactions;

--\c get a specific transactions 
SELECT * FROM transactions WHERE id = $1;

--\checking name or properties of object/transaction
SELECT t FROM transactions t WHERE t.token_balance = $1;

--\c adding a specific transactions
INSERT INTO transactions (token_balance, pin, deposit, redeem, reverse, user_id, cashier_id ) VALUES ($1, $2, $3, $4, $5, $6, $7);

--\c delete a transaction
DELETE FROM transactions WHERE id = $1;


---------------------------------------Win Histories Table ----------------------------


CREATE TABLE win_histories (
	ID SERIAL PRIMARY KEY,
	game_id INT,
    user_id INT,
    cashier_id INT,
    value BIGINT
);

INSERT INTO win_histories (game_id, user_id, cashier_id, value) 
VALUES (1, 1, 1, 2500), (2, 2, 1, 2900), (3, 3, 1, 500);

--\ get all win_histories
SELECT * FROM win_histories;

--\c get a specific winHistory 
SELECT * FROM win_histories WHERE id = $1;

--\checking name or properties of object/winHistory
SELECT w FROM win_histories w WHERE w.value = $1;

--\c adding a specific winHistory
INSERT INTO win_histories (game_id, user_id, cashier_id, value) VALUES ($1, $2, $3, $4);

--\c delete a win_histoory
DELETE FROM win_histories WHERE id = $1;


--------------------------------Cashiers Table ---------------------------------------

CREATE TABLE cashiers (
	ID SERIAL PRIMARY KEY,
    name VARCHAR(255),
    deposit BIGINT,
    redeem BIGINT,
    profit BIGINT,
    user_id INT,
    payout_percentage DECIMAL
);

INSERT INTO cashiers (name, deposit, redeem, profit, user_id, payout_percentage ) 
VALUES ('sanet', 25000, 10000, 15000, 1, 10), ('sanet', 25000, 1000, 1500, 2, 15);

--\ get all cashiers
SELECT * FROM cashiers;

--\c get a specific cashiers 
SELECT * FROM cashiers WHERE id = $1;

--\checking name or properties of object/cashier
SELECT c FROM cashiers c WHERE c.deposit = $1;

--\c adding a specific cashier
INSERT INTO cashiers (name, deposit, redeem, profit, user_id, payout_percentage ) VALUES ($1, $2, $3, $4, $5, $6);

--\c delete a cashier
DELETE FROM cashiers WHERE id = $1;

----\c updating 


------------------------------------------------LOCAL JACKPOTS TABLE --------------------------------

CREATE TABLE local_jackpots (
	ID SERIAL PRIMARY KEY,
    won BOOLEAN,
    current_value BIGINT,
    user_id INT,
    win_history_id INT
);

INSERT INTO local_jackpots (won, current_value, user_id, win_history_id ) 
VALUES ('true', 25000, 1, 5), ('true', 25000, 2, 3);

--\ get all local_jackpots
SELECT * FROM local_jackpots;

--\c get a specific local_jackpot 
SELECT * FROM local_jackpots WHERE id = $1;

--\checking name or properties of object/local_jackpots
SELECT l FROM local_jackpots l WHERE l.current_value = $1;

--\c adding a specific local_jackpot
INSERT INTO local_jackpots (won, current_value, user_id, win_history_id ) VALUES ($1, $2, $3, $4);

--\c delete a local_jackpot
DELETE FROM local_jackpots WHERE id = $1;


---------------------------------------------GLOBAL JACKPOTS TABLE ----------------------------

CREATE TABLE global_jackpots (
	ID SERIAL PRIMARY KEY,
    won BOOLEAN,
    current_value BIGINT,
    black_tokens BIGINT,
    silver_tokens BIGINT,
    platinum_tokens BIGINT,
    diamond_tokens BIGINT,
    user_id INT,
    win_history_id INT
);

INSERT INTO global_jackpots (won, current_value, user_id, win_history_id, black_tokens, silver_tokens, platinum_tokens, diamond_tokens ) 
VALUES ('false', 980000, 1, 1, 13400, 34000, 67000, 987000);

--\ get all global_jackpots
SELECT * FROM global_jackpots;

--\c get a specific global_jackpot
SELECT * FROM global_jackpots WHERE id = $1;

--\checking name or properties of object/global_jackpot
SELECT gl FROM global_jackpots gl WHERE gl.current_value = $1;

--\c adding a specific global_jackpot
INSERT INTO global_jackpots (won, current_value, user_id, win_history_id, black_tokens, silver_tokens, platinum_tokens, diamond_tokens ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);

--\c delete a global_jackpot
DELETE FROM global_jackpots WHERE id = $1;
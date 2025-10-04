const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Create connection to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: 'password', // your MySQL password
  database: 'shopkeeper' // your database name
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// API to fetch transactions (replace 'transactions' with your table)
app.get('/api/transactions', (req, res) => {
  const sqlQuery = 'SELECT * FROM transactions'; // Replace with your table name
  db.query(sqlQuery, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

// Start server
app.listen(3006, () => {
  console.log('Server is running on port 3006');
});

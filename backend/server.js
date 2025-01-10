import express from 'express'; // Use import instead of require
import bodyParser from 'body-parser';
import mysql from 'mysql';

const app = express();
const port = 5000;

// Body parser middleware to parse incoming JSON data
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'your_database_name'
});

// Connecting to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// POST endpoint for saving data
app.post('/api', (req, res) => {
  const { text, question_1, question_2, name, email, contact } = req.body;

  const query = 'INSERT INTO your_table_name (text, question_1, question_2, name, email, contact) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [text, question_1, question_2, name, email, contact], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ message: 'Error saving data' });
    } else {
      res.status(200).json({ message: 'Data saved successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

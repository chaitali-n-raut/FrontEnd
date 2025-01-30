const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000; // Choose a suitable port number

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'your_mysql_server',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name'
});

// Set up Express to handle form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define a route to handle form submissions
app.post('/submitForm', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  // Add other form field variables as needed

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from pool: ' + err.stack);
      res.status(500).send('Error connecting to the database');
      return;
    }

    const insertQuery = 'INSERT INTO your_table_name (name, email) VALUES (?, ?)';
    connection.query(insertQuery, [name, email], (err, result) => {
      connection.release();

      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).send('Error saving data to the database');
        return;
      }

      console.log('Data inserted successfully');
      res.send('Data submitted successfully!');
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});


// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
  
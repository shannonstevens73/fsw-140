// To fix error for Full Stack SQL assignment run following in MySQL Workbench
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'endTimesNow5656';
// flush privileges;


const express = require("express");
const mysql = require("mysql");
//Create a MySQL Connection Handshake using a Connection String
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'endTimesNow5656',
        database: 'fsSQL'
    }
);

db.connect((err) => {
    if (err)
    {
        throw err;
    }
    console.log("MySQL Database Connection Established Successfully!");
});


//Setting up a Basic Express Server
const app = express();


//Create a Database
app.get('/createdb', (req, res) => {
    let sqlQuery = "CREATE DATABASE 14Dec2020";
    //Run the SQL Command
    db.query(sqlQuery, (err, result) => {
        if (err)
        {
            throw err;
        }
        console.log(result);
        res.send("Database Created Succesfully!");
    });
});


//Create a Table
app.get('/createtable', (req, res) => {
    let sqlQuery = "CREATE TABLE postings (ID INT AUTO_INCREMENT, title VARCHAR(250), message varchar(250), PRIMARY KEY (ID) )";
    //Run the SQL Command
    db.query(sqlQuery, (err, result) => {
        if (err)
        {
            throw err;
        }
        console.log(result);
        res.send("Table Created Succesfully!");
    });
});

//Execute an Insert Command
app.get('/insertposting1', (req, res) => {
    let post = {twitterName: 'First Post', tagName: 'First Post', tweet: 'This is my value for the first ever posting in the newly created table!'};
    let sql = "INSERT INTO postings SET ?";

    //Run the SQL Command
    let query = db.query(sql, post, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("First Post Inserted into the Table Successfully!");
    })
});

//Execute Second Insert Command
app.get('/insertposting2', (req, res) => {
    let post = {twitterName: 'Second Post', tagName: 'Second Post', tweet: 'This is my value for the second posting in the postings table!'};
    let sql = "INSERT INTO postings SET ?";

    //Run the SQL Command
    let query = db.query(sql, post, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("Second Post Inserted into the Table Successfully!");
    })
});

//Execute a Select Command
app.get('/getpostings', (req, res) => {
    let sql = "SELECT * FROM tweet";

    //Run the SQL Command
    db.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("SELECT Query Executed Successfully!");
    })
});

//Execute a Select Command for a specfic number of rows to be included in the result set
app.get('/getpostings/:id', (req, res) => {
    let sql = `SELECT * FROM postings WHERE id = ${req.params.id}`

    //Run the SQL Command
    db.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("SELECT Query Executed Successfully With a WHERE Clause added in it!");
    })
});

//Execute an UPDATE Statement
app.get('/updateposting/:id', (req, res) => {
    let newTitle = "This row is now changed to this new value using UPDATE Query with WHERE clause!";
    let sql = `UPDATE postings SET title = '${newTwitterName}' WHERE id = ${req.params.id}`;

    //Run the SQL Command
    db.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("UPDATE Query Executed Successfully With a WHERE Clause in it!");
    })
});

//Execute a DELETE Statement
app.get('/deleteposting/:id', (req, res) => {
    let newTitle = "This row is now changed to this new value using UPDATE Query with WHERE clause!";
    let sql = `DELETE FROM postings WHERE id = ${req.params.id}`;

    //Run the SQL Command
    db.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("DELETE Query Executed Successfully With a WHERE Clause in it!");
    })
});
 
//Open Up the Server and its Port
app.listen('8000', () => {
    console.log("Local Web Server Running on Port 8000");
});
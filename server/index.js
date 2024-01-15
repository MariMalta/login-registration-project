const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "signup"
});

db.connect(err => {
    if (err) {
        console.error('Didnt connet to the db ' + err);
        return;
    }
    console.log('Connect to the database');
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login(`name`, `email`, `password`) VALUES(?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    console.log("oi")
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        console.log("here")
        console.log(data)
        return res.json(data);
    })
})



app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        console.log(data);
        console.log(err);
        console.log("oi");

        if (err) {
            //return res.json("Error")
        }
        if (data.length > 0) {
            return res.json("success");
        } else {
            return res.json("fail");
        }
    })
})

app.listen(3001, () => {
    console.log("listening");
})


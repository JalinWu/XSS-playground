const express = require('express');
const router = express.Router();
var fs = require("fs");
var file = "./message.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

router.get('/', (req, res) => {
    // ?txt=<script>alert(1)</script>
    // ?txt=alert(1)
    var query = "SELECT * FROM message;"
    db.serialize(() => {
        db.all(query, (err, rows) => {
            console.log(rows);
            res.render('index', {
                msg: rows
            })
        })
    })
    
})

module.exports = router;
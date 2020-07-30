const express = require('express');
const router = express.Router();
var fs = require("fs");
var file = "./message.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

router.get('/', (req, res) => {
    // ?txt=<script>alert(1)</script>
    // ?txt=alert(1)
    // console.log(req.query);
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

router.get('/getData', (req, res) => {
    var query = "SELECT * FROM message;"
    db.serialize(() => {
        db.all(query, (err, rows) => {
            console.log(rows);
            
            res.send({
                msg: rows
            })
        })
    })
})

router.get('/createDB', (req, res) => {
    db.serialize(() => {
        // 如果 message 資料表不存在，那就建立 message 資料表
        db.run("CREATE TABLE IF NOT EXISTS  message (name TEXT, msg TEXT)");

        // 清空 message 資料表
        db.run("DELETE from message");

        // 塞入 default data
        var sqlInsertDefault = db.prepare("INSERT INTO message VALUES (?, ?)");
        sqlInsertDefault.run("Andy", "<script>alert(123)</script>");

        sqlInsertDefault.finalize();

        res.send('good job');
    })
})

module.exports = router;
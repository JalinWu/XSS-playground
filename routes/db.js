const express = require('express');
const router = express.Router();
var fs = require("fs");
var file = "./message.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

// reset
router.get('/reset', (req, res) => {
    var messageTable = new Array();

    db.serialize(() => {
        // 如果 message 資料表不存在，那就建立 message 資料表
        db.run("CREATE TABLE IF NOT EXISTS  message (name TEXT, msg TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)");

        // 清空 message 資料表
        db.run("DELETE from message");

        // 塞入 default data
        var sqlInsertDefault = db.prepare("INSERT INTO message VALUES (?, ?, ?)");
        sqlInsertDefault.run("Hank", "It's a wonderful website!", new Date());
        sqlInsertDefault.run("Winnie", "I like the color in this website, it's really beautiful.", new Date());

        sqlInsertDefault.finalize();

        var query = "SELECT * FROM message;";
        console.log(query);

        db.all(query, (err, rows) => {
            console.log(rows);
            messageTable = rows;
            res.send(
                messageTable
            );
        })
    })
    
})

// setMsg
router.post('/setMsg', (req, res) => {
    const { name, msg } = req.body;

    var query = `INSERT INTO message (name, msg, created_at) VALUES (?, ?, ?);`
    db.serialize(() => {
        var date = new Date();
        console.log(query);
        console.log(`name: ${name} \nmsg: ${msg} \ncreated_at: ${date}`)
        db.run(query, name, msg, date);

        res.send('success');
    })
})

// getMsg
router.get('/getMsg', (req, res) => {
    var messageTable = new Array();

    var query = "SELECT * FROM message order by created_at desc;"
    db.serialize(() => {
        console.log(query);
        db.all(query, (err, rows) => {
            console.log(rows);
            rows.forEach((item) => {
                var date = new Date(item.created_at);
                date.setHours(date.getHours()+8);
                item.created_at = date.toUTCString();
                messageTable.push(item);
            })

            res.send(
                messageTable
            );
        })
    })
})

module.exports = router;
const express = require('express');
const router = express.Router();
var fs = require("fs");
var file = "./message.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

// gameRule
router.get('/', (req, res) => {
    res.render('gameRule', {
        gameRuleActive: "active",
        gameStartActive: "",
        solutionsActive: ""
    })
});

// gameStart
router.get('/gameStart', (req, res) => {
    // ?txt=<script>alert(1)</script>
    // ?txt=alert(1)
    var msgTable = new Array();
    var query = "SELECT * FROM message;"

    db.serialize(() => {
        console.log(query);
        db.all(query, (err, rows) => {
            if(rows){
                msgTable = rows;
            } else {
                msgTable = [];
            }
            console.log(msgTable);
            
            res.render('gameStart', {
                msgTable,
                gameRuleActive: "",
                gameStartActive: "active",
                solutionsActive: ""
            })
        })
    })
    
})

// solutions
router.get('/solutions', (req, res) => {
    res.render('solutions', {
        gameRuleActive: "",
        gameStartActive: "",
        solutionsActive: "active"
    });
})

module.exports = router;
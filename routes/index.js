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
    // var query = "SELECT * FROM message order by created_at desc;"

    db.serialize(() => {
        // console.log(query);
        res.render('gameStart', {
            gameRuleActive: "",
            gameStartActive: "active",
            solutionsActive: ""
        })
    })

})

// solutions
router.get('/solutions', (req, res) => {
    res.render('solutions', {
        gameRuleActive: "",
        gameStartActive: "",
        solutionsActive: "active",
        solution1: "<script>alert(\"恭喜抽中iphone! 請點擊以下連結領取:(惡意連結)\")</script>",
        solution2: "<script>var phone = prompt(\"恭喜抽中iphone! 請輸入手機號碼等待通知:\"); console.log(phone);</script>"
    });
})

module.exports = router;
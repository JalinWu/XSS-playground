const express = require('express')
const app = express()
 
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    // ?txt=<script>alert(1)</script>
    // ?txt=alert(1)
    console.log(req.query);
    
    res.render('index', {
        msg: req.query.txt
    })
})
 
app.listen(3000, console.log('Server started on 3000'));
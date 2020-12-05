const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/cal.html");
});

app.post('/add', (req, res) => {
    var ans = parseInt(req.body.num1) + parseInt(req.body.num2);
    res.send("<h1>Addition is: " + ans.toString() + "</h1>");
});

app.post('/sub', (req, res) => {
    var ans = parseInt(req.body.num1) - parseInt(req.body.num2);
    res.send("<h1>Subtraction is: " + ans.toString() + "</h1>");
});

app.post('/mul', (req, res) => {
    var ans = parseInt(req.body.num1) * parseInt(req.body.num2);
    res.send("<h1>Multiplication is: " + ans.toString() + "</h1>");
});

app.post('/div', (req, res) => {
    var ans = parseInt(req.body.num1) / parseInt(req.body.num2);
    res.send("<h1>Division is: " + ans.toString() + "</h1>");
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
    console.log(__dirname);
});
const express = require('express')
const bodyParser = require('body-parser')
const dateObj = require(__dirname + "/date.js");
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

var tasksArr = ['cut onions', 'make paneer', 'make food'];
var workTasks = ['study for FAT', 'coding'];


app.get('/', (req, res) => {

    var date = dateObj.getDate();
    res.render('list', {
        Title: date,
        tasksArr: tasksArr
    });

});

app.post('/', (req, res) => {
    var t = req.body.task;
    tasksArr.push(t);
    res.redirect('/');
    console.log(req.body);
});

app.get('/work', (req, res) => {
    res.render('list', { Title: "Worklist", tasksArr: workTasks });
});

app.post('/work', (req, res) => {
    var t = req.body.task;
    workTasks.push(t);
    res.redirect('/work');
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
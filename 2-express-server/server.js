const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('lol');
});

app.get('/about', function (req, res) {
    res.send("<h1>I am awesome. And cool also...</h1>");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
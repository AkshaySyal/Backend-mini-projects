const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const https = require('https');
const apikey = "184315aef94a050c14041916ef0aa96b";
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
    var city = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    https.get(url, function (response) {
        console.log('status code: ', response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            var desc = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            var temp = weatherData.main.temp;
            var imgURL = `http://openweathermap.org/img/wn/${icon}@4x.png`
            res.write(`<h1>Temperature: ${temp} degrees </h1>`);
            res.write(`<h1>Weather description: ${desc} </h1>`);
            res.write(`<img src="${imgURL}">`);
            res.send();

        });
    });




});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
const News = require('./news.js')
const express = require('express')
const app = express()
const port = 3000
const news = new News();

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain)
app.use(express.static(__dirname + '/dist'))

app.get('/news', (req, res) => {
    console.log('request');
    const newsList = news.randomList();
    res.setHeader('Content-Type', 'application/json');
    res.send(newsList)
    res.end()
})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
 });

app.listen(port, () => {
    console.log(`Server API listening at http://localhost:${port}`)
})

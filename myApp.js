let express = require('express');
require('dotenv').config()
let bodyParser = require('body-parser')
let app = express();

console.log("Hello World");

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.use("/public", express.static(__dirname + '/public'));

app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE == 'uppercase') 
        res.json({"message": "Hello json".toUpperCase()});
    else
        res.json({"message": "Hello json"});
});

const middleware = (req, res, next) => {
    req.time = new Date().toString();
    next();
};

// function middleware(req, res, next) {
//     req.time = new Date().toString();
//     next();
// };

// 'const' Function Expressions: When defining functions using 'const', it
// creates a function expression. Unlike 'function' declarations, 'const' 
// function expressions are not hoisted and result in an error when called
// before declaration.

app.get('/now', middleware, (req, res) => {
    res.json({time: req.time});
});

app.get('/:word/echo', (req, res) => {
    const word = req.params.word;
    res.json({echo: word});
});

app.get('/name', (req, res) => {
    var { first: firstName, last: lastName } = req.query;
    res.json({name: `${firstName} ${lastName}`});
});

app.post('/name', (req, res) => {
    var { first: firstName, last: lastName } = req.body;
    res.json({name: `${firstName} ${lastName}`});
});





























 module.exports = app;

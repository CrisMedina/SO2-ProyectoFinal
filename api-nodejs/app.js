var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');
var app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', require('./routes/users'))
app.use('/transferencias', require('./routes/transferencias'))

module.exports = app;

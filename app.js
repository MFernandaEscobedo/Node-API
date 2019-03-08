'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4');
const api = require('./routes/index');
const app = express();

const fs = require('fs');
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.static('public'));

const storageMulter = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, uuid() + '-' + file.originalname);
    },
    destination: path.join(__dirname, '/public/images')
});

app.use(multer({
    storage: storageMulter
}).any());

app.use('/api', api);

module.exports = app;
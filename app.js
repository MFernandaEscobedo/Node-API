'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/index');
const app = express();

const fs = require('fs');
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static('public'));
app.use(cors);
app.use('/api', api);

module.exports = app;
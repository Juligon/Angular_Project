const express = require('express');
const cors = require('cors');
const routes = require('./routes/index.js');
const morgan = require('morgan');

const server = express();

require('./db.js');

server.name = 'API';

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));

server.use('/', routes);

module.exports = server;
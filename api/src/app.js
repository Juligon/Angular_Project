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
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.setHeader('Permissions-Policy', 'browsing-topics=(())');
  next();
});


server.use('/', routes);

module.exports = server;
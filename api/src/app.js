const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
const morgan = require("morgan");
const path = require("path");
const helmet = require("helmet");

const server = express();

require("./db.js");

server.name = "API";

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
	definition: {
		openapi: "3.1.0",
		info: {
			title: "Node.js - Express API",
			version: "1.0.0",
		},
		servers: [
			{
				url: "https://tripsadmin-production.up.railway.app",
			},
		],
	},
	apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(
	"/api-doc",
	swaggerUI.serve,
	swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
 	next();
});
server.use(helmet.contentSecurityPolicy({
  directives: {
    "font-src": "'self' *"
  }
}));

server.use("/api", routes);

module.exports = server;

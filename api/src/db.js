require("dotenv").config();
const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_URL } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
    protocol: 'postgres',
    dialectOptions: {
      ssl: false,
    },
  }
);

// const sequelize = new Sequelize(DB_URL, {
//   logging: false, 
//   native: false, 
// 	protocol: 'postgres',
// });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});

// Inyectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Trip, User, Bus, Model } = sequelize.models;

// Aca vendrian las relaciones
User.hasMany(Trip, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Trip.belongsTo(User);

Bus.hasMany(Trip, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Trip.belongsTo(Bus);

Model.hasMany(Bus, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Bus.belongsTo(Model);

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};

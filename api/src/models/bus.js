const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Bus = sequelize.define(
		"Bus",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			patente: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			cantidadAsientos: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			modelo: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
		},
		{ timestamps: false }
	);

	return Bus;
};
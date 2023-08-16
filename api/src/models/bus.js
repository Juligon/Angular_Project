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
			asientos: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			modeloId: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
		},
		{ timestamps: false }
	);

	return Bus;
};
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Busmodel = sequelize.define(
		"Busmodel",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			brand: {
				allowNull: false,
				type: DataTypes.STRING,
			},
		},
		{ timestamps: false }
	);

	return Busmodel;
};
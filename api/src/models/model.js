const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Model = sequelize.define(
		"Model",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			nombre: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			marca: {
				allowNull: false,
				type: DataTypes.STRING,
			},
		},
		{ timestamps: false }
	);

	return Model;
};
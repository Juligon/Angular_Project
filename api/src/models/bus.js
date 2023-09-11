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
			plate: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			seats: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			modelId: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
		},
		{ timestamps: false }
	);

	return Bus;
};
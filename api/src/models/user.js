const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const User = sequelize.define(
		"User",
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
			apellido: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			edad: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
		},
		{ timestamps: false }
	);

	return User;
};
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Person = sequelize.define(
		"Person",
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

	return Person;
};
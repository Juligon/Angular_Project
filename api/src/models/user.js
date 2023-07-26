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
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			lastname: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			age: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
		},
		{ timestamps: false }
	);

	return User;
};
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Trip = sequelize.define(
		"Trip",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			origin: {
				allowNull: false,
				type: DataTypes.STRING,				
			},
			destination: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			departure: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			regress: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			usersID: {
				type: DataTypes.ARRAY(DataTypes.INTEGER)
			},
			busID: {
				type: DataTypes.INTEGER,
			},
		},
		{ timestamps: false }
	);
	
	return Trip;
};
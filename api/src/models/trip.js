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
				type: DataTypes.STRING,
			},
			regress: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			userId: {
				type: DataTypes.ARRAY(DataTypes.INTEGER),
			},
			busId: {
				type: DataTypes.INTEGER,
			},
		},
		{ timestamps: false }
	);
	
	return Trip;
};
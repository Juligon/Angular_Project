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
			origen: {
				allowNull: false,
				type: DataTypes.STRING,				
			},
			destino: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			ida: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			vuelta: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			usuarioId: {
				type: DataTypes.ARRAY(DataTypes.INTEGER),
			},
			colectivoId: {
				type: DataTypes.INTEGER,
			},
		},
		{ timestamps: false }
	);
	
	return Trip;
};
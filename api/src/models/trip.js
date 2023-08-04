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
			lugarSalida: {
				allowNull: false,
				type: DataTypes.STRING,				
			},
			lugarDestino: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			fechaLlegada: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			fechaSalida: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			personaId: {
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
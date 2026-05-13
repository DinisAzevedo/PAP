const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const EcopontoEquipamento = sequelize.define("EcopontoEquipamento", {
  ecopontoId: { type: DataTypes.INTEGER, primaryKey: true },
  equipamentoId: { type: DataTypes.INTEGER, primaryKey: true },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: "ecoponto_equipamento",
  timestamps: true
});


module.exports = EcopontoEquipamento;
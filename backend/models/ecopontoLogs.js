const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const EcopontoLogs = sequelize.define("EcopontoLogs", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ecopontoId: DataTypes.INTEGER,
  equipamentoId: DataTypes.INTEGER,
  detalhes: DataTypes.TEXT,
  hora: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: "ecoponto_logs",
  timestamps: false
});

module.exports = EcopontoLogs;
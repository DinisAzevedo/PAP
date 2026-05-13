const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const TipoEcoponto = sequelize.define("TipoEcoponto", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tipo: DataTypes.TEXT,
  descricao: DataTypes.TEXT,
}, {
  tableName: "tipo_ecoponto",
  timestamps: false
});

module.exports = TipoEcoponto;
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const TipoDeposito = sequelize.define("TipoDeposito", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tipo: DataTypes.TEXT,
  descricao: DataTypes.TEXT,
}, {
  tableName: "tipo_deposito",
  timestamps: false
});

module.exports = TipoDeposito;
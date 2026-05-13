const { DataTypes } = require("sequelize");
const sequelize = require("../db");

/* =========================
   TIPOS ECOPONTO
========================= */
const TipoEcoponto = sequelize.define("TipoEcoponto", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tipo: DataTypes.TEXT,
  descricao: DataTypes.TEXT,
}, {
  tableName: "tipo_ecoponto",
  timestamps: false
});


/* =========================
   TIPOS DEPOSITO
========================= */
const TipoDeposito = sequelize.define("TipoDeposito", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tipo: DataTypes.TEXT,
  descricao: DataTypes.TEXT,
}, {
  tableName: "tipo_deposito",
  timestamps: false
});


/* =========================
   DEPOSITO
========================= */
const Deposito = sequelize.define("Deposito", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  capacidadeTotal: DataTypes.FLOAT,
  altura: DataTypes.FLOAT,
  tipoDepositoId: DataTypes.INTEGER,
  descricao: DataTypes.TEXT,
}, {
  tableName: "deposito",
  timestamps: false
});


/* =========================
   ECOPONTO
========================= */
const Ecoponto = sequelize.define("Ecoponto", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  codigo: { type: DataTypes.TEXT, unique: true },
  tipoEcopontoId: DataTypes.INTEGER,
  depositoId: DataTypes.INTEGER,
  capacidadeAtual: DataTypes.FLOAT,
  latitude: DataTypes.DECIMAL,
  longitude: DataTypes.DECIMAL,
  descricao: DataTypes.TEXT,
}, {
  tableName: "ecoponto",
  timestamps: false
});


/* =========================
   EQUIPAMENTO
========================= */
const Equipamento = sequelize.define("Equipamento", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  codigo: { type: DataTypes.TEXT, unique: true },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: false },
  bateria: DataTypes.DECIMAL,
}, {
  tableName: "equipamento",
  timestamps: false
});


/* =========================
   ECOPONTO_EQUIPAMENTO (N:N)
========================= */
const EcopontoEquipamento = sequelize.define("EcopontoEquipamento", {
  ecopontoId: { type: DataTypes.INTEGER, primaryKey: true },
  equipamentoId: { type: DataTypes.INTEGER, primaryKey: true },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: "ecoponto_equipamento",
  timestamps: true
});


/* =========================
   ECOPONTO LOGS
========================= */
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


/* =========================
   RELAÇÕES
========================= */

// Tipo Ecoponto -> Ecoponto
TipoEcoponto.hasMany(Ecoponto, { foreignKey: "tipoEcopontoId" });
Ecoponto.belongsTo(TipoEcoponto, { foreignKey: "tipoEcopontoId" });

// Tipo Deposito -> Deposito
TipoDeposito.hasMany(Deposito, { foreignKey: "tipoDepositoId" });
Deposito.belongsTo(TipoDeposito, { foreignKey: "tipoDepositoId" });

// Deposito -> Ecoponto
Deposito.hasMany(Ecoponto, { foreignKey: "depositoId" });
Ecoponto.belongsTo(Deposito, { foreignKey: "depositoId" });

// Ecoponto <-> Equipamento (N:N)
Ecoponto.belongsToMany(Equipamento, {
  through: EcopontoEquipamento,
  foreignKey: "ecopontoId"
});

Equipamento.belongsToMany(Ecoponto, {
  through: EcopontoEquipamento,
  foreignKey: "equipamentoId"
});


/* =========================
   EXPORTS
========================= */
module.exports = {
  TipoEcoponto,
  TipoDeposito,
  Deposito,
  Ecoponto,
  Equipamento,
  EcopontoEquipamento,
  EcopontoLogs
};
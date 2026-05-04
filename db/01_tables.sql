DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE Tipo_ecoponto (
  id SERIAL PRIMARY KEY,
  tipo TEXT,
  descricao TEXT
);

CREATE TABLE Tipo_deposito (
  id SERIAL PRIMARY KEY,
  tipo TEXT,
  descricao TEXT
);

CREATE TABLE Deposito (
  id SERIAL PRIMARY KEY,
  capacidadeTotal FLOAT,
  tipoDepositoId INT REFERENCES Tipo_deposito(id),
  descricao TEXT
);

CREATE TABLE Ecoponto (
    id SERIAL PRIMARY KEY,
    codigo TEXT UNIQUE NOT NULL,
    tipoEcopontoId INT REFERENCES Tipo_ecoponto(id),
    depositoId INT REFERENCES Tipo_deposito(id),
    capacidadeAtual FLOAT,
    latitude DECIMAL,
    longitude DECIMAL,
    descricao TEXT
);

CREATE TABLE Equipamento (
  id SERIAL PRIMARY KEY,
  codigo TEXT UNIQUE NOT NULL,
  bateria DECIMAL
);

CREATE TABLE Ecoponto_logs (
  id SERIAL PRIMARY KEY,
  ecopontoId INT REFERENCES ecoponto(id) NOT NULL,
  ecopontoId INT REFERENCES ecoponto(id) NOT NULL,
  detalhes TEXT,
  hora DATETIME CURRENT_TIMESTAMP()
);
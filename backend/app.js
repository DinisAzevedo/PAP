const express = require("express");
const pool = require("./db");

const app = express();

app.get("/", async (req, res) => {
  try {
    res.json("online");
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.get("/tipo_ecoponto", async (req, res) => {
  try {
    const result = await pool.query("SELECT * from tipo_ecoponto");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.get("/tipo_deposito", async (req, res) => {
  try {
    const result = await pool.query("SELECT * from tipo_deposito");
     res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.get("/deposito", async (req, res) => {
  try {
    const result = await pool.query("SELECT * from deposito");
     res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.get("/ecoponto", async (req, res) => {
  try {
    const result = await pool.query("SELECT * from ecoponto");
     res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.get("/equipamento", async (req, res) => {
  try {
    const result = await pool.query("SELECT * from equipamento");
     res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.get("/ecoponto_logs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * from ecoponto_logs");
     res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.post("/capacidade", async (req, res) => {
  const {codigoEquipamento, codigoEcoponto, profundidade} = req.body;
  const sql = "UPDATE ecoponto SET capacidadeAtual = ? WHERE ecoponto.codigo = ?";
  await pool.query(sql, [profundidade, codigoEcoponto]);

});

app.listen(3000, () => {
  console.log("Servidor online");
});
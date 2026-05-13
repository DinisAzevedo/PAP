const router = require("express").Router();

router.get("/tabela/:nometabela", async (req, res) => {
  try {
    const { nometabela } = req.params;
    const tabela = tabelas[nometabela];
    if (!tabela) {
      return res.status(400).json({ erro: "Tabela inválida" });
    }
    const result = await tabela.findAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
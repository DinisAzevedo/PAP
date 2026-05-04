const pool = require("./db");
const fs = require("fs");
const path = require("path");

async function runSQL() {
  const sqlPath = path.join(__dirname, "../dist/queries_combinadas.sql");
  const sql = fs.readFileSync(sqlPath, "utf8");

  const queries = sql.split(";").filter(q => q.trim());

  for (const query of queries) {
    await pool.query(query);
  }

  console.log("SQL executado!");
}

runSQL();
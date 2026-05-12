// auto-changelog.js
//
// Script Node.js para:
// 1. Ler o último commit
// 2. Obter o diff do commit
// 3. Enviar para OpenAI API
// 4. Gerar descrição técnica automática
// 5. Adicionar ao CHANGELOG.md
//
// Requisitos:
// npm install openai dotenv
//
// Criar .env:
// OPENAI_API_KEY=xxxxxxxxxxxxx
//
// Executar:
// node auto-changelog.js

require("dotenv").config();

const fs = require("fs");
const { execSync } = require("child_process");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateChangelog() {
  try {
    // =========================
    // 1. Obter último commit hash
    // =========================
    const commitHash = execSync("git rev-parse HEAD")
      .toString()
      .trim();

    // =========================
    // 2. Obter título commit
    // =========================
    const commitTitle = execSync("git log -1 --pretty=%B")
      .toString()
      .trim();

    // =========================
    // 3. Obter diff completo
    // =========================
    const diff = execSync("git show HEAD --stat --patch")
      .toString();

    console.log("Analisando commit...");
    console.log(commitTitle);

    // =========================
    // 4. Prompt IA
    // =========================
    const prompt = `
Faz de conta que és um assistente técnico especializado em documentação académica de projetos PAP de um aluno de Programação Avançada.
O aluno está a desenvolver um projeto em Node.js + React + Express + PostgreSQL de gestão de ecopontos e rotas de recolha de resíduos.
O objetivo do projeto é criar uma aplicação web que recebe dados de um arduino responsável por medir a profundiade dos ecopontos e mediante a profunidade recebida, calcular a % de ocupação do ecoponto através da divisão da profundiade recebida pela altura do ecoponto, altura esta armazenada na base de dados. O sistema também irá buscar à base de dados as localizações dos ecopontos e de acordo com as % de ocupação dos ecopontos, irá calcular a rota mais eficiente de recolha, priorizando ecopontos mais cheios e ignorando os menos cheios. O sistema também irá armazenar logs de cada recolha feita, com data e hora, e os equipamentos utilizados na recolha.


Analisa o commit Git feito pelo aluno, guia-te pelos comentários (caso existam) e gera:
- Um resumo técnico formal com uma descrição clara do que foi desenvolvido
- O resumo deve ser escrito em 3ª pessoa no pretério perfeito. 
- Recorre a termos como "foi implementado", "foi criado", "foi atualizado", etc. não uses "eu", "nós", "meu", "nosso", etc. e refira-se ao aluno como "o aluno" ou "o estudante".
- Usa termos técnicos precisos (endpoint, commit, rota, ...) e evita linguagem coloquial ou informal.
- Em português europeu
- Linguagem profissional e objetiva

Tens aqui um exemplo de um resumo técnico escrito pelo aluno em outro projeto. Ignora o que o texto de exemplo contém, visto que pertence a contexto diferente e a um projeto distinto e foca-te apenas no estilo de escrita utilizado e procura replicar esse estilo no resumo que vais gerar:
Com a apresentação final a aproximar-se, o aluno passou o dia a adicionar e a laminar a app. Começou por trocar a associação de cargo para exercício de hard-code para fazer a associação através de uma tabela que o Pedro enviou, que continha o código da pipeline do workable, que era possível encontrar dentro do profile_url enviado na payload e continha o url com o repositório do GitHub. O aluno fez uma função que usava o axios para obter a tabela, pegava no ID através do url e fazia a associação com a tabela, que posteriormente via o url do repositório e cortava para apenas ter o nome do repositório e devolvê-lo para depois ser usado como parâmetro de template na função de criar o repositório. Para fazer isso, o aluno teve de criar novas variáveis de ambiente, o nome do repositório com a tabela associativa e o ficheiro que a continha, de modo a que o url do axios contesse o caminho correto, então o aluno atualizou o exemplo de .env para o programa. O aluno também decidiu usar o email das variáveis ambiente que estava associado com o SES como email predefinido e seria usado para caso o email de recrutador pretendido tivesse um erro na obtenção, o resto do processo pudesse proseguir mas com um email de recrutador já definido no próprio ambiente. O aluno também esteve a alterar o design dos email para ficarem mais concisos. Enquanto o aluno fazia os testes com o trigger para garantir que tudo funcionaria na apresentação no dia seguinte, o trigger começou a dar erro, mesmo com os testes locais a funcionarem, o que fez com que o trigger fosse abaixo, mas ao ligar ao Cláudio, ele explicou ao aluno que ele devia fazer os testes com o Bruno, mas apontado à lambda em vez de localmente e ligou o trigger de volta. O erro era que as novas variáveis de ambiente não tinham sido colocadas na Lambda nem do Secret Manager, fazendo com que o url do axios ficasse inválido e desse um erro, mas ao colocar as variáveis de ambiente novas, tudo funcionou como pretendido. O aluno ainda fez um diagrama de sequência a explicar os processos da app para a apresentação.

TÍTULO COMMIT:
${commitTitle}

DIFF:
${diff}
`;

    // =========================
    // 5. Chamada OpenAI
    // =========================
    const response = await client.chat.completions.create({
      model: "gpt-5.4-mini",
      messages: [
        {
          role: "system",
          content:
            "Especialista em documentação técnica e relatórios académicos.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const summary = response.choices[0].message.content.trim();

    console.log("\nResumo gerado:\n");
    console.log(summary);

    // =========================
    // 6. Data atual
    // =========================
    const date = new Date().toLocaleDateString("pt-PT");

    // =========================
    // 7. Formato changelog
    // =========================
    const changelogEntry = `
## ${date}

### Commit
${commitTitle}

### Hash
${commitHash}

### Descrição
${summary}

---
`;

    // =========================
    // 8. Guardar em CHANGELOG
    // =========================
    fs.appendFileSync("CHANGELOG.md", changelogEntry);

    console.log("\nCHANGELOG.md atualizado com sucesso.");
  } catch (error) {
    console.error("\nErro:");
    console.error(error);
  }
}

generateChangelog();
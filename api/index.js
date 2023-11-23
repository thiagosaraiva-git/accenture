const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { swaggerUi, specs } = require("./swagger");
const logsRouter = require("./src/routes/logs");
const app = express();

// Configuração do MongoDB
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// Configuração do Mongoose
mongoose.connect(MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro de conexão com o MongoDB:"));
db.once("open", () => {
  console.log("Conectado ao MongoDB");
});

// Configuração do Express
app.use(express.json());
app.use(cors());

// Rota para a documentação Swagger
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(specs));

// Rotas
app.use("/api/logs", logsRouter);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const express = require("express");
const router = express.Router();
const fs = require("fs");
const Log = require("../models/logModel");
const { swaggerUi, specs } = require("../../swagger");

/**
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único do log
 *         date:
 *           type: string
 *           format: date-time
 *           description: Data do log
 *         message:
 *           type: string
 *           description: Conteúdo da mensagem do log
 */

/**
 * @swagger
 * /api/logs/extract:
 *   post:
 *     summary: Extrai e insere logs do sistema de arquivos
 *     responses:
 *       200:
 *         description: Logs extraídos e salvos com sucesso
 *       500:
 *         description: Erro ao processar os logs
 */

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Retorna todos os logs
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           description: Período para filtrar logs YYYY-MM-DD to YYYY-MM-DD
 *       - in: query
 *         name: content
 *         schema:
 *           type: string
 *         description: Conteúdo para filtrar logs
 *     responses:
 *       200:
 *         description: Array de logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 */

// Rota para extração e inserção de logs
router.post("/extract", async (req, res) => {
  try {
    const files = fs.readdirSync("./logs");
    files.forEach((file) => {
      const data = fs.readFileSync(`./logs/${file}`, "utf-8");
      const logsArray = data.split("\n");

      logsArray.forEach(async (log) => {
        const logData = log.split(";");

        // Verifica se a data é válida antes de tentar criar um objeto Date
        const dateIsValid = !isNaN(new Date(logData[1]).valueOf());

        if (dateIsValid) {
          const newLog = new Log({
            ipAddress: logData[0],
            date: new Date(logData[1]),
            time: logData[2],
            serverName: logData[3],
            version: logData[4],
            requestId: logData[5],
            message: logData[6],
          });

          await newLog.save();
        }
      });
    });

    res.status(200).json({ message: "Logs extraídos e salvos com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao processar os logs" });
  }
});

// Rota para obter todos os logs
router.get("/", async (req, res) => {
  try {
    const { period, content } = req.query;
    let query = {};

    // Lógica para processar os parâmetros de filtro
    if (period) {
      const [startDate, endDate] = period.split(" to ");
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    if (content) {
      query.message = { $regex: new RegExp(content, "i") }; // Pesquisa de conteúdo que contém a string (case insensitive)
    }

    const logs = await Log.find(query);
    res.json(logs);
  } catch (error) {
    console.error("Erro ao obter os logs:", error);
    res.status(500).json({ message: "Erro ao obter os logs" });
  }
});

// Rota para a documentação Swagger
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(specs));

module.exports = router;

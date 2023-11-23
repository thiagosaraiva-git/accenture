const request = require('supertest');
const express = require('express');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const fs = require('fs');
const logRoutes = require('../src/routes/logs');

const app = express();

beforeAll(async () => {
  // Configuração do servidor MongoDB de memória
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  app.use('/api/logs', logRoutes);
});

afterAll(async () => {
  const mongod = await MongoMemoryServer.create();
  await mongoose.disconnect();
  await mongod.stop();
});

describe('POST /api/logs/extract', () => {
  it('deve extrair e salvar logs com sucesso', async () => {
    // Simulando o comportamento esperado para o fs.readFileSync
    jest.spyOn(fs, 'readFileSync').mockReturnValue('ip;2023-01-01;12:00:00;server;1.0;requestId;test message');

    const response = await request(app).post('/api/logs/extract').expect(200);
    expect(response.body.message).toBe('Logs extraídos e salvos com sucesso!');
  });

  it('deve retornar 500 em caso de erro ao processar logs', async () => {
    // Simulando um erro ao processar logs
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('Erro simulado ao ler arquivo');
    });

    const response = await request(app).post('/api/logs/extract').expect(500);
    expect(response.body.message).toBe('Erro ao processar os logs');
  });
});

// Restante dos testes...

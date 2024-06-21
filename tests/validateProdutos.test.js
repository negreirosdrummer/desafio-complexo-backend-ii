const { validateName } = require('../middlewares/nomeMiddleware');
const { validateDescricao } = require('../middlewares/descricaoMiddleware');
const { validatePreco } = require('../middlewares/precoMiddleware');
const { validateDataAtualizado } = require('../middlewares/dataMiddleware');
const express = require('express');
const request = require('supertest');

const app = express();
app.use(express.json());
app.post('/produtos', validateName, validateDescricao, validatePreco, validateDataAtualizado, (req, res) => {
  res.status(200).send({ message: 'Valid input' });
});

describe('Validation Middleware for Product Fields', () => {
  // Testes para validação do nome
  it('should return 400 if nome is missing', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ descricao: 'Descrição válida', preco: 100, data_atualizado: '2024-04-06 20:44:32' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "nome" é obrigatório');
  });

  it('should return 400 if nome is empty', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: '', descricao: 'Descrição válida', preco: 100, data_atualizado: '2024-04-06 20:44:32' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "nome" não pode ser vazio');
  });

  it('should return 400 if nome is less than 3 characters', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'No', descricao: 'Descrição válida', preco: 100, data_atualizado: '2024-04-06 20:44:32' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "nome" deve ter entre 3 e 255 caracteres');
  });

  it('should return 400 if nome is more than 255 characters', async () => {
    const longName = 'a'.repeat(256);
    const response = await request(app)
      .post('/produtos')
      .send({ nome: longName, descricao: 'Descrição válida', preco: 100, data_atualizado: '2024-04-06 20:44:32' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "nome" deve ter entre 3 e 255 caracteres');
  });

  it('should pass if nome is valid', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', descricao: 'Descrição válida', preco: 100, data_atualizado: '2024-04-06 20:44:32' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Valid input');
  });

  // Testes para validação da descrição
  it('should return 400 if descricao is missing', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', preco: 100, data_atualizado: '2024-04-06 20:44:32' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "descrição" é obrigatório');
  });

  it('should return 400 if descricao is empty', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', descricao: '', preco: 100, data_atualizado: '2024-04-06 20:44:32' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "descrição" não pode ser vazio');
  });

  it('should return 400 if descricao is less than 3 characters', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', descricao: 'No', preco: 100, data_atualizado: '2024-04-06 20:44:32' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "descrição" deve ter entre 3 e 255 caracteres');
  });

  it('should return 400 if descricao is more than 255 characters', async () => {
    const longDescription = 'a'.repeat(256);
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', descricao: longDescription, preco: 100, data_atualizado: '2024-04-06 20:44:32' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "descrição" deve ter entre 3 e 255 caracteres');
  });

  it('should pass if descricao is valid', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', descricao: 'Descrição válida', preco: 100, data_atualizado: '2024-04-06 20:44:32' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Valid input');
  });

  // Testes para validação do preço
  it('should return 400 if preco is missing', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', descricao: 'Descrição válida', data_atualizado: '2024-04-06 20:44:32' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "preço" é obrigatório');
  });

  it('should return 400 if preco is not a number', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', descricao: 'Descrição válida', preco: 'abc', data_atualizado: '2024-04-06 20:44:32' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "preço" deve ser um número maior que zero');
  });

  it('should return 400 if preco is less than or equal to 0', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', descricao: 'Descrição válida', preco: -1, data_atualizado: '2024-04-06 20:44:32' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "preço" deve ser um número maior que zero');
  });

  it('should pass if preco is valid', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', descricao: 'Descrição válida', preco: 100, data_atualizado: '2024-04-06 20:44:32' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Valid input');
  });

  // Testes para validação da data
  test('Deve retornar erro se o campo data_atualizado não for enviado', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', descricao: 'Descrição válida', preco: 100 });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "data_atualizado" é obrigatório');
  });

  test('Deve retornar erro se o campo data_atualizado for vazio', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', descricao: 'Descrição válida', preco: 100, data_atualizado: '' });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "data_atualizado" não pode ser vazio');
  });

  test('Deve retornar erro se o campo data_atualizado não estiver no formato correto', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', descricao: 'Descrição válida', preco: 100, data_atualizado: '06-20-2024' });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "data_atualizado" deve estar no formato YYYY-MM-DD HH:MM:SS');
  });

  test('Deve retornar erro se a data_atualizado estiver fora do intervalo permitido', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', descricao: 'Descrição válida', preco: 100, data_atualizado: '1999-12-31 12:00:00' });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "data_atualizado" deve estar entre 1 de Janeiro de 2000 e 20 de Junho de 2024');
  });

  test('Deve retornar erro se a data_atualizado estiver fora do intervalo permitido', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', descricao: 'Descrição válida', preco: 100, data_atualizado: '2024-06-21 12:00:00' });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('O campo "data_atualizado" deve estar entre 1 de Janeiro de 2000 e 20 de Junho de 2024');
  });

  test('Deve passar se a data_atualizado estiver dentro do intervalo permitido', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({ nome: 'Produto Válido', descricao: 'Descrição válida', preco: 100, data_atualizado: '2024-06-20 12:00:00' });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Valid input');
  });
});

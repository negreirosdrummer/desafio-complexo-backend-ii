const { validateName } = require('../middlewares/nomeMiddleware');
const { validateFamilyName } = require('../middlewares/sobrenomeMiddleware');
const { validateEmail } = require('../middlewares/emailMiddleware');
const { validateAge } = require('../middlewares/idadeMiddleware');
const express = require('express');
const request = require('supertest');

const app = express();
app.use(express.json());
app.post('/clientes', validateName, validateFamilyName, validateEmail, validateAge, (req, res) => {
  res.status(200).send({ message: 'Valid input' });
});

describe('Validation Middleware', () => {
  describe('validateName Middleware', () => {
    it('should return 400 if nome is missing', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          sobrenome: "Oliveira",
          email: "pedro@email.com",
          idade: 22
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('O campo "nome" é obrigatório');
    });

    it('should return 400 if nome is empty', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "",
          sobrenome: "Oliveira",
          email: "pedro@email.com",
          idade: 22
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('O campo "nome" não pode ser vazio');
    });

    it('should return 400 if nome is less than 3 characters', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "Pe",
          sobrenome: "Oliveira",
          email: "pedro@email.com",
          idade: 22
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('O campo "nome" deve ter entre 3 e 255 caracteres');
    });

    it('should return 400 if nome is more than 255 characters', async () => {
      const longName = 'a'.repeat(256);
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: longName,
          sobrenome: "Oliveira",
          email: "pedro@email.com",
          idade: 22
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('O campo "nome" deve ter entre 3 e 255 caracteres');
    });

    it('should pass if nome is valid', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "Pedro",
          sobrenome: "Oliveira",
          email: "pedro@email.com",
          idade: 22
        });
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Valid input');
    });
  });

  describe('validateFamilyName Middleware', () => {
    it('should return 400 if sobrenome is missing', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "Pedro",
          email: "pedro@email.com",
          idade: 22
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('O campo "sobrenome" é obrigatório');
    });

    it('should return 400 if sobrenome is empty', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "Pedro",
          sobrenome: "",
          email: "pedro@email.com",
          idade: 22
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('O campo "sobrenome" não pode ser vazio');
    });

    it('should return 400 if sobrenome is less than 3 characters', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "Pedro",
          sobrenome: "Ol",
          email: "pedro@email.com",
          idade: 22
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('O campo "sobrenome" deve ter entre 3 e 255 caracteres');
    });

    it('should return 400 if sobrenome is more than 255 characters', async () => {
      const longSurname = 'a'.repeat(256);
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "Pedro",
          sobrenome: longSurname,
          email: "pedro@email.com",
          idade: 22
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('O campo "sobrenome" deve ter entre 3 e 255 caracteres');
    });

    it('should pass if sobrenome is valid', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "Pedro",
          sobrenome: "Oliveira",
          email: "pedro@email.com",
          idade: 22
        });
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Valid input');
    });
  });

  describe('validateEmail Middleware', () => {
    it('should return 400 if email is missing', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "Pedro",
          sobrenome: "Oliveira",
          idade: 22
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('O campo "email" é obrigatório');
    });

    it('should return 400 if email is empty', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "Pedro",
          sobrenome: "Oliveira",
          email: "",
          idade: 22
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('O campo "email" não pode ser vazio');
    });

    it('should return 400 if email is invalid', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "Pedro",
          sobrenome: "Oliveira",
          email: "invalid-email",
          idade: 22
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('O email inserido não é válido');
    });

    it('should pass if email is valid', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "Pedro",
          sobrenome: "Oliveira",
          email: "pedro@email.com",
          idade: 22
        });
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Valid input');
    });
  });

  describe('validateAge Middleware', () => {
    it('should return 400 if idade is missing', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "Pedro",
          sobrenome: "Oliveira",
          email: "pedro@email.com",
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('O campo "idade" é obrigatório');
    });

    it('should return 400 if idade is empty', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "Pedro",
          sobrenome: "Oliveira",
          email: "pedro@email.com",
          idade: ""
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('O campo "idade" é obrigatório');
    });

    it('should return 400 if idade is invalid', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "Pedro",
          sobrenome: "Oliveira",
          email: "pedro@email.com",
          idade: -1
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('"Idade" deve ser maior que 0 e no máximo 120');
    });

    it('should pass if idade is valid', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: "Pedro",
          sobrenome: "Oliveira",
          email: "pedro@email.com",
          idade: 22
        });
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Valid input');
    });
  });
});

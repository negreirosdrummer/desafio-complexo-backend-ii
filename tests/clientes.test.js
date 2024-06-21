const request = require('supertest');
const app = require('../app');

let token;

beforeAll(async () => {
  const loginResponse = await request(app)
    .post('/login')
    .send({
      "usuario": "raphael",
      "senha": "senharaphael"
    });

  token = loginResponse.body.token;
});

describe('GET /clientes', () => {
  it('should return 401 if no token is provided', async () => {
    const response = await request(app)
      .get('/clientes');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Token não fornecido');
  });

  it('should return a list of clients if token is provided', async () => {
    const response = await request(app)
      .get('/clientes')
      .set('x-access-token', token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('POST /clientes', () => {
  it('should return 401 if no token is provided', async () => {
    const newClient = {
      "nome": "Pedro",
      "sobrenome": "Oliveira",
      "email": "pedro@email.com",
      "idade": 22
    };

    const response = await request(app)
      .post('/clientes')
      .send(newClient);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Token não fornecido');
  });

  it('should create a new client if token is provided', async () => {
    const newClient = {
      "nome": "Pedro",
      "sobrenome": "Silva",
      "email": "pedro@email.com",
      "idade": 24
    };

    const response = await request(app)
      .post('/clientes')
      .set('x-access-token', token)
      .send(newClient);

    expect(response.status).toBe(200);
  });
});

describe('PUT /clientes', () => {
  it('should return 401 if no token is provided', async () => {
    const updatedClient = {
      "nome": "Pedro",
      "sobrenome": "Oliveira",
      "email": "pedro@email.com",
      "idade": 22,
      "id": 5
    };

    const response = await request(app)
      .put('/clientes')
      .send(updatedClient);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Token não fornecido');
  });

  it('should update an existing client if token is provided', async () => {
    const updatedClient = {
      "nome": "Pedro",
      "sobrenome": "Oliveira",
      "email": "pedro@email.com",
      "idade": 22,
      "id": 6
    };

    const response = await request(app)
      .put('/clientes')
      .set('x-access-token', token)
      .send(updatedClient);

    expect(response.status).toBe(200);
  });
});

describe('DELETE /clientes/:id', () => {
  it('should return 401 if no token is provided', async () => {
    const response = await request(app)
      .delete('/clientes/6');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Token não fornecido');
  });

  it('should delete an existing client if token is provided', async () => {
    const response = await request(app)
      .delete('/clientes/6')
      .set('x-access-token', token);

    expect(response.status).toBe(200);
  });
});

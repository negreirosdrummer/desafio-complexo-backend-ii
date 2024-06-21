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

describe('GET /usuarios', () => {
  it('should return a list of users', async () => {
    const response = await request(app)
      .get('/usuarios')
      .set('x-access-token', token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('POST /usuarios', () => {
  it('should create a new user', async () => {
    const newUser = {
      "usuario": "pedro",
      "senha": "senhapedro",
      "token": ""
    };

    const response = await request(app)
      .post('/usuarios')
      .set('x-access-token', token)
      .send(newUser);

    expect(response.status).toBe(200);
  });
});

describe('PUT /usuarios', () => {
  it('should update an existing user', async () => {
    const updatedUser = {
      "usuario": "pedro",
      "senha": "novasenhapedro",
      "token": "",
      "id": 6
    };

  const response = await request(app)
    .put('/usuarios')
    .set('x-access-token', token)
    .send(updatedUser);

  expect(response.status).toBe(200);
});
});

describe('DELETE /usuarios/:id', () => {
  it('should delete an existing user', async () => {
    const response = await request(app)
      .delete('/usuarios/6')
      .set('x-access-token', token);

    expect(response.status).toBe(200);
  });
});

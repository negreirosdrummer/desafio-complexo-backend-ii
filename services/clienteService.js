const connection = require('../configs/dbConfiguration');
const cache = require('../configs/cache');

const findAll = async () => {
  const cacheKey = 'all_clients';
  if (cache.has(cacheKey)) {
    console.log('Requisição feita ao cache');
    return cache.get(cacheKey);
  } else {
    console.log('Requisição feita ao banco de dados');
    const clientes = await (await connection).execute('SELECT * FROM clientes');
    cache.set(cacheKey, clientes[0]);
    return clientes[0];
  }
};

const update = async (cliente) => {
  const query = 'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ? ';
  const isOk = await (await connection).execute(query,
    [cliente.nome, cliente.sobrenome, cliente.email, cliente.idade, cliente.id]);
  if (isOk[0].affectedRows === 1) {
    cache.flushAll();
  }
  return isOk[0].affectedRows === 1;
};

const save = async (cliente) => {
  const query = 'INSERT INTO clientes(nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)';
  const isOk = await (await connection).execute(query,
    [cliente.nome, cliente.sobrenome, cliente.email, cliente.idade]);
  if (isOk[0].affectedRows === 1) {
    cache.flushAll();
  }
  return isOk[0].affectedRows === 1;
};

const remove = async (id) => {
  const query = 'DELETE FROM clientes WHERE id = ?';
  const isOk = await (await connection).execute(query, [id]);
  if (isOk[0].affectedRows === 1) {
    cache.flushAll();
  }
  return isOk[0].affectedRows === 1;
};

module.exports = {
  findAll,
  save,
  remove,
  update,
};

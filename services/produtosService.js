const connection = require('../configs/dbConfiguration');
const cache = require('../configs/cache');

const findAll = async () => {
  const cacheKey = 'all_products';
  if (cache.has(cacheKey)) {
    console.log('Requisição feita ao cache');
    return cache.get(cacheKey);
  } else {
    console.log('Requisição feita ao banco de dados');
    const produtos = await (await connection).execute('SELECT * FROM produtos');
    cache.set(cacheKey, produtos[0]);
    return produtos[0];
  }
};

const update = async (produtos) => {
  const query = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ? ';
  const isOk = await (await connection).execute(query,
    [produtos.nome, produtos.descricao, produtos.preco, produtos.data_atualizado, produtos.id]);
  if (isOk[0].affectedRows === 1) {
    cache.flushAll();
  }
  return isOk[0].affectedRows === 1;
};

const save = async (produtos) => {
  const query = 'INSERT INTO produtos(nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)';
  const isOk = await (await connection).execute(query,
    [produtos.nome, produtos.descricao, produtos.preco, produtos.data_atualizado]);
  if (isOk[0].affectedRows === 1) {
    cache.flushAll();
  }
  return isOk[0].affectedRows === 1;
};

const remove = async (id) => {
  const query = 'DELETE FROM produtos WHERE id = ?';
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
  
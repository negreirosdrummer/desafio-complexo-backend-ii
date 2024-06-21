const connection = require('../configs/dbConfiguration');
const cache = require('../configs/cache');

const findAll = async () => {
  const cacheKey = 'all_users';
  if (cache.has(cacheKey)) {
    console.log('Requisição feita ao cache');
    return cache.get(cacheKey);
  } else {
    console.log('Requisição feita ao banco de dados');
    const usuarios = await (await connection).execute('SELECT * FROM usuarios');
    cache.set(cacheKey, usuarios[0]);
    return usuarios[0];
  }
};

const update = async (usuario) => {
  const query = 'UPDATE usuarios SET usuario = ?, senha = ?, token = ? WHERE id = ? ';
  const isOk = await (await connection).execute(query,
    [usuario.usuario, usuario.senha, usuario.token, usuario.id]);
  if (isOk[0].affectedRows === 1) {
    cache.flushAll();
  }
  return isOk[0].affectedRows === 1;
};

const save = async (usuario) => {
  const query = 'INSERT INTO usuarios(usuario, senha, token) VALUES (?, ?, ?)';
  const isOk = await (await connection).execute(query,
    [usuario.usuario, usuario.senha, usuario.token]);
  if (isOk[0].affectedRows === 1) {
    cache.flushAll();
  }
  return isOk[0].affectedRows === 1;
};

const remove = async (id) => {
  const query = 'DELETE FROM usuarios WHERE id = ?';
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

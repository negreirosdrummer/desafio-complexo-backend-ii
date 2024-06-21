const connection = require('../configs/dbConfiguration');

const removeToken = async (id) => {
  const query = 'UPDATE usuarios SET token = NULL WHERE id = ?';
  const [result] = await connection.execute(query, [id]);
  return result;
};

const addTokenToBlacklist = async (token) => {
  const query = 'INSERT INTO tokens_invalidos (token, data_inclusao) VALUES (?, NOW())';
  const [result] = await connection.execute(query, [token]);
  return result;
};

module.exports = {
  removeToken,
  addTokenToBlacklist,
};

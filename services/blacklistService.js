const connection = require('../configs/dbConfiguration');

const isTokenBlacklisted = async (token) => {
  const query = 'SELECT COUNT(*) as count FROM tokens_invalidos WHERE token = ?';
  const [rows] = await connection.execute(query, [token]);
  return rows[0].count > 0;
};

module.exports = {
  isTokenBlacklisted,
};
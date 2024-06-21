const jwt = require('jsonwebtoken');
const connectionPromise = require('../configs/dbConfiguration');
require('dotenv').config();

const secret = process.env.SECRET;

const authenticateUser = async (usuario, senha) => {
  try {
    const connection = await connectionPromise;

    const [results] = await connection.execute('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

    if (results.length > 0) {
      const user = results[0];

      if (user.senha === senha) {
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: 300 });

        // Armazena o token no banco de dados
        await connection.execute('UPDATE usuarios SET token = ? WHERE id = ?', [token, user.id]);

        return { auth: true, token: token };
      } else {
        return { auth: false, message: 'Senha inválida' };
      }
    } else {
      return { auth: false, message: 'Usuário não encontrado' };
    }
  } catch (err) {
    console.error('Erro no serviço de autenticação:', err);
    throw new Error('Erro interno do servidor');
  }
};

module.exports = { authenticateUser };

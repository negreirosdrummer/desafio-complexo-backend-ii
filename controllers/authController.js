const { authenticateUser } = require('../services/authService');

const login = async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }

  try {
    const result = await authenticateUser(usuario, senha);

    if (result.auth) {
      return res.json(result);
    } else {
      return res.status(401).json(result);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = { login };

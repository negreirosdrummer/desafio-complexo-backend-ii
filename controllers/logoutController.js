// controllers/logoutController.js
const logoutService = require('../services/logoutService');

async function logout(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send({ message: 'ID do usuário é obrigatório' });
  }

  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send({ message: 'Token é obrigatório' });
  }

  try {
    await logoutService.removeToken(id);
    await logoutService.addTokenToBlacklist(token);
    res.status(200).send({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = {
  logout,
};

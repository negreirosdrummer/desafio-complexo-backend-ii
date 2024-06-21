const jwt = require('jsonwebtoken');
const blacklistService = require('../services/blacklistService');

const secret = process.env.SECRET;

async function jwtMiddleware(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ message: 'Token não fornecido' });
  }

  const isBlacklisted = await blacklistService.isTokenBlacklisted(token);
  if (isBlacklisted) {
    return res.status(401).send({ message: 'Token inválido' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Token inválido' });
    }
    req.id = decoded.id;
    next();
  });
}

module.exports = jwtMiddleware;
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
/* GET home page. */
router.get('/', function(req, res, next) {
  mysql.createConnection({
    host: 'localhost', user: 'rafa', password: 'senha',
    database: 'desafio-backend-ii', port: 3306,
  }).then((connection) => {
    res.send('Obteve uma requisição GET em /');
  });
});
module.exports = router;

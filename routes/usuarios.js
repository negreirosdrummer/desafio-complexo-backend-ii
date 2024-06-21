const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

/* GET usuários*/
router.get('/', jwtMiddleware, usuariosController.findAll);
/* POST usuários*/
router.post('/', jwtMiddleware, usuariosController.save,);
/* PUT usuários*/
router.put('/', jwtMiddleware, usuariosController.update,);
/* DELETE usuários*/
router.delete('/:id', jwtMiddleware, usuariosController.remove);

module.exports = router;

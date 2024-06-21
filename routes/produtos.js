const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const nomeMiddleware = require('../middlewares/nomeMiddleware');
const descricaoMiddleware = require('../middlewares/descricaoMiddleware');
const precoMiddleware = require('../middlewares/precoMiddleware');
const dataMiddleware = require('../middlewares/dataMiddleware');

/* GET produtos*/
router.get('/', produtoController.findAll);
/* POST produtos*/
router.post('/', nomeMiddleware.validateName,
    descricaoMiddleware.validateDescricao,
    precoMiddleware.validatePreco,
    dataMiddleware.validateDataAtualizado,
    produtoController.save,
);/* PUT produtos*/
router.put('/', nomeMiddleware.validateName,
    descricaoMiddleware.validateDescricao,
    precoMiddleware.validatePreco,
    dataMiddleware.validateDataAtualizado,
    produtoController.update
);
/* DELETE produtos*/
router.delete('/:id', produtoController.remove);

module.exports = router;

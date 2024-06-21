const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const nomeMiddleware = require('../middlewares/nomeMiddleware');
const sobrenomeMiddleware = require('../middlewares/sobrenomeMiddleware');
const emailMiddleware = require('../middlewares/emailMiddleware');
const idadeMiddleware = require('../middlewares/idadeMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

/* GET clientes */
router.get('/', jwtMiddleware, clienteController.findAll);

/* POST clientes */
router.post('/',
    jwtMiddleware,
    nomeMiddleware.validateName,
    sobrenomeMiddleware.validateFamilyName,
    emailMiddleware.validateEmail,
    idadeMiddleware.validateAge,
    clienteController.save
);

/* PUT clientes */
router.put('/',
    jwtMiddleware,
    nomeMiddleware.validateName,
    sobrenomeMiddleware.validateFamilyName,
    emailMiddleware.validateEmail,
    idadeMiddleware.validateAge,
    clienteController.update
);

/* DELETE clientes */
router.delete('/:id', jwtMiddleware, clienteController.remove);

module.exports = router;

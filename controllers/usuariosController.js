const usuariosService = require('../services/usuariosService');

const findAll = async (request, response) => {
  const usuarios = await usuariosService.findAll();
  return response.status(200).json(usuarios);
};

const save = async (request, response) => {
  const result = await usuariosService.save(request.body);
  return result ?
    response.status(200).json() : response.status(400).json({
      '[ERROR/SERVER]': 'Falha ao salvar usuário',
    });
};

const update = async (request, response) => {
  const result = await usuariosService.update(request.body);
  return result ?
    response.status(200).json() : response.status(400).json({
      '[ERROR/SERVER]': 'Falha ao atualizar usuário',
    });
};

const remove = async (request, response) => {
  const {id} = request.params;
  const result = await usuariosService.remove(id);
  return result ?
    response.status(200).json() : response.status(400).json({
      '[ERROR/SERVER]': 'Falha ao remover usuário',
    });
};

module.exports = {
  findAll,
  save,
  remove,
  update,
};

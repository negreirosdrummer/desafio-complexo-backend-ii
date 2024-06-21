const validateDescricao = (request, response, next) => {
  const {body} = request;

  if (body.descricao == undefined) {
    return response.status(400)
        .json({message: 'O campo "descrição" é obrigatório'});
  }

  if (body.descricao === '') {
    return response.status(400)
        .json({message: 'O campo "descrição" não pode ser vazio'});
  }

  if (body.descricao.length < 3 || body.descricao.length > 255) {
    return response.status(400)
        .json({message: 'O campo "descrição" deve ter entre 3 e 255 caracteres'});
  }

  next();
};

module.exports = {validateDescricao};

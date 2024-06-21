const validateName = (request, response, next) => {
  const {body} = request;

  if (body.nome == undefined) {
    return response.status(400)
        .json({message: 'O campo "nome" é obrigatório'});
  }

  if (body.nome.trim() === '') {
    return response.status(400)
        .json({message: 'O campo "nome" não pode ser vazio'});
  }

  if (body.nome.length < 3 || body.nome.length > 255) {
    return response.status(400)
        .json({message: 'O campo "nome" deve ter entre 3 e 255 caracteres'});
  }

  next();
};

module.exports = {validateName};

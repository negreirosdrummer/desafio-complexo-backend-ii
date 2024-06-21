const validateFamilyName = (request, response, next) => {
  const {body} = request;

  if (body.sobrenome == undefined) {
    return response.status(400)
        .json({message: 'O campo "sobrenome" é obrigatório'});
  }

  if (body.sobrenome.trim() === '') {
    return response.status(400)
        .json({message: 'O campo "sobrenome" não pode ser vazio'});
  }

  if (body.sobrenome.length < 3 || body.sobrenome.length > 255) {
    return response.status(400)
        .json({message: 'O campo "sobrenome" deve ter entre 3 e 255 caracteres'});
  }

  next();
};

module.exports = {validateFamilyName};

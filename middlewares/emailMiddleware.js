const validateEmail = (request, response, next) => {
  const {body} = request;
  if (body.email === undefined) {
    return response.status(400)
        .json({message: 'O campo "email" é obrigatório'});
  }
  if (body.email.trim() === '') {
    return response.status(400)
        .json({message: 'O campo "email" não pode ser vazio'});
  }
  
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(body.email)) {
    return response.status(400)
        .json({message: 'O email inserido não é válido'});
  }
  next();
};

module.exports = {validateEmail};

const validatePreco = (request, response, next) => {
  const { body } = request;

  if (body.preco == undefined) {
    return response.status(400)
        .json({ message: 'O campo "preço" é obrigatório' });
  }

  if (typeof body.preco !== 'number' || isNaN(parseFloat(body.preco)) || parseFloat(body.preco) <= 0) {
    return response.status(400)
        .json({ message: 'O campo "preço" deve ser um número maior que zero' });
  }

  next();
};

module.exports = { validatePreco };

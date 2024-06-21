const validateDataAtualizado = (request, response, next) => {
  const { body } = request;

  if (body.data_atualizado === undefined) {
    return response.status(400)
        .json({ message: 'O campo "data_atualizado" é obrigatório' });
  }

  if (body.data_atualizado === '') {
    return response.status(400)
        .json({ message: 'O campo "data_atualizado" não pode ser vazio' });
  }

  if (typeof body.data_atualizado !== 'string') {
    return response.status(400)
        .json({ message: 'O campo "data_atualizado" deve ser uma string' });
  }


  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/;
  if (!dateTimeRegex.test(body.data_atualizado)) {
    return response.status(400)
        .json({ message: 'O campo "data_atualizado" deve estar no formato YYYY-MM-DD HH:MM:SS' });
  }

  const dataAtualizado = new Date(body.data_atualizado);

  const limiteInferior = new Date('2000-01-01');
  const limiteSuperior = new Date('2024-06-21');

  if (dataAtualizado < limiteInferior || dataAtualizado > limiteSuperior) {
    return response.status(400).json({
      message: 'O campo "data_atualizado" deve estar entre 1 de Janeiro de 2000 e 20 de Junho de 2024'
    });
  }

  next();
};

module.exports = { validateDataAtualizado };

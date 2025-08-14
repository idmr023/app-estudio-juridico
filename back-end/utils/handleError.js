function handleError(res, err, context = 'un especificado') {
  console.error(`Error en el contexto '${context}':`, err);
  res.status(500).send('Error interno del servidor');
}

module.exports = handleError;
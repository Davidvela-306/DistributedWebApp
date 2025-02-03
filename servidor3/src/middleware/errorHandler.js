const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "JSON inválido",
      message: "El formato del JSON enviado es incorrecto",
    });
  }

  if (err.code && err.code.startsWith("ER_")) {
    return res.status(500).json({
      error: "Error de base de datos",
      message: "Ocurrió un error al procesar la solicitud en la base de datos",
      errorCode: err.code,
    });
  }

  res.status(500).json({
    error: "Error interno del servidor",
    message: "Ocurrió un error inesperado. Intente nuevamente más tarde.",
    errorId: Date.now(),
  });
};

module.exports = errorHandler;

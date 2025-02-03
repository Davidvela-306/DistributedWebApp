const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Validaciones (pueden moverse a un archivo aparte, como utils/validations.js)
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateName = (name) =>
  typeof name === "string" &&
  name.length >= 2 &&
  name.length <= 50 &&
  /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
const validateMessage = (message) =>
  typeof message === "string" && message.length >= 10 && message.length <= 500;

// GET - Obtener todos los contactos
router.get("/contact-form", async (req, res, next) => {
  try {
    const pool = db.getPool();
    if (!pool) {
      throw new Error("Pool de base de datos no inicializado");
    }

    const [results] = await pool.query(`
      SELECT
        BIN_TO_UUID(id) as id,
        name,
        lastName,
        mail,
        message,
        date
      FROM contact_form 
      ORDER BY date DESC
    `);

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    next(error);
  }
});

// POST - Nuevo mensaje de contacto
router.post("/contact-form", async (req, res, next) => {
  try {
    const pool = db.getPool();
    if (!pool) {
      throw new Error("Pool de base de datos no inicializado");
    }

    const { name, lastName, mail, message } = req.body;

    // Validar campos requeridos
    if (!name || !lastName || !mail || !message) {
      return res.status(400).json({
        success: false,
        error: "Todos los campos son requeridos",
      });
    }

    // Validaciones específicas
    const errors = {};
    if (!validateName(name))
      errors.name = "Nombre inválido, solo letras y espacios (2-50 caracteres)";
    if (!validateName(lastName))
      errors.lastName =
        "Apellido inválido, solo letras y espacios (2-50 caracteres)";
    if (!validateEmail(mail))
      errors.mail = "Correo inválido, debe ser de la forma example@domain.com";
    if (!validateMessage(message))
      errors.message = "Mensaje inválido, debe tener entre 10 y 500 caracteres";

    // Si hay errores de validación, retornarlos
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: "Error de validación",
        details: errors,
      });
    }

    // Sanitización de datos
    const contact = {
      name: name.trim(),
      lastName: lastName.trim(),
      mail: mail.toLowerCase().trim(),
      message: message.trim(),
      date: new Date(),
    };

    // Insertar contacto en la base de datos
    const [result] = await pool.query(
      "INSERT INTO contact_form SET ?",
      contact
    );

    // Obtener UUID del nuevo contacto
    const [idResult] = await pool.query(
      "SELECT BIN_TO_UUID(id) as id FROM contact_form WHERE id = LAST_INSERT_ID()"
    );

    // Respuesta exitosa
    res.status(201).json({
      success: true,
      message: "Contacto creado exitosamente",
      data: {
        id: idResult[0].id,
        ...contact,
        date: contact.date.toISOString(),
      },
    });
  } catch (error) {
    // Manejo de errores de base de datos
    if (error.code && error.code.startsWith("ER_")) {
      return res.status(500).json({
        success: false,
        error: "Error de base de datos",
        message:
          "Ocurrió un error al procesar la solicitud en la base de datos",
        errorCode: error.code,
      });
    }

    // Otros errores
    next(error);
  }
});

module.exports = router;

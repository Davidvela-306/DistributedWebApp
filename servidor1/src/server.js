const express = require("express");
require("./config/dotenv");
const cors = require("cors");
const { initDB } = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Iniciar base de datos
initDB()
  .then(() => {
    // Rutas
    app.use("/api", contactRoutes);

    // Ruta raíz
    app.get("/", (req, res) => res.send("Hello World desde el servidor 1!"));

    // Middleware 404
    app.use((req, res) => {
      res.status(404).json({
        error: "Ruta no encontrada",
        message: `La ruta ${req.originalUrl} no existe`,
      });
    });

    // Manejo de errores global
    app.use(errorHandler);

    // Iniciar servidor
    app.listen(PORT, () =>
      console.log(`🚀 Servidor 1 listo`)
    );
  })
  .catch((error) => {
    console.error("Error al inicializar la base de datos:", error);
    process.exit(1);
  });

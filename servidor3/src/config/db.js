const mysql = require("mysql2/promise");

// Función para conectar con reintento en caso de error
async function connectWithRetry() {
  let connection;
  while (!connection) {
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
      });
      console.log("Conectado a la base de datos");
    } catch (err) {
      console.error("Error al conectar, reintentando en 5 segundos...", err);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  return connection;
}

// Crear un pool de conexiones para mejorar el rendimiento
let pool = null;

const initDB = async () => {
  try {
    // Intentar la conexión con reintentos
    const connection = await connectWithRetry();

    // Crear el pool de conexiones
    pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Crear la tabla si no existe
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_form (
        id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())),
        name VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        mail VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        date DATETIME NOT NULL,
        PRIMARY KEY (id)
      )
    `);
    console.log("✔ Base de datos conectada y tabla lista.");

    // Cerrar la conexión inicial
    await connection.end();

    return pool;
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error);
    process.exit(1);
  }
};

module.exports = {
  initDB,
  getPool: () => pool,
};

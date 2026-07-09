import express from "express";
import "dotenv/config";
import sequelize from "./database/connection.js";
import userRoutes from "./routes/user-routes.js";
import authRoutes from "./routes/auth-routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/usuarios", userRoutes);
app.use("/api/autenticacion", authRoutes);

/* 
ENDPOINTS
POST   /api/usuarios -> Registrarse
POST   /api/auth/login -> Logearse
GET    /api/usuarios/perfil -> Ver perfil
PUT    /api/usuarios -> Editar usuario
DELETE /api/usuarios -> Eliminar usuario
*/

async function inicialize () {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa");
    await sequelize.sync({force:false});
    console.log("Tablas sincronizadas");
    app.listen(PORT, () => {
      console.log(`POST http://localhost:${PORT}/api/usuarios`)
    });
  } catch(error) {
    console.log("Error al iniciar: ", error.message);
    process.exit(1);
  };  
};

inicialize();
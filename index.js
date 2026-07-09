import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import sequelize from "./database/connection.js";
import userRoutes from "./routes/user-routes.js";
import authRoutes from "./routes/auth-routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", authRoutes);

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
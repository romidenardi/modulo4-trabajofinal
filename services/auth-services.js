import bcrypt from "bcrypt";
import * as userServices from "./user-services.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../tokens/user-tokens.js";
import logger from "../config/logger.js";

export async function login(email, password) {  
  const user = await userServices.searchByEmail(email);
  if (!user) {
    logger.warn(`Intento de login con usuario inexistente: ${email}`);
    throw new Error("Usuario inexistente.");
  }
  const validPassword = await bcrypt.compare(
    password,
    user.password,
  );
  if (!validPassword) {
    logger.warn(`Intento de login inválido: ${email}`);
    throw new Error("Contraseña inválida.");
  }
  logger.info(`Login exitoso: ${user.email}`);
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
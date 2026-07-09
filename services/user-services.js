import bcrypt from "bcrypt";
import User from "../database/models/users.js";
import { sendWelcomeEmail } from "./mail-services.js";
import logger from "../config/logger.js";

const SALT_ROUNDS = 10;

export async function createUser(data) {
  const {name, email, password, role} = data;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  logger.info(`Nuevo usuario registrado: ${newUser.name} (${newUser.email})`);
  try {
  await sendWelcomeEmail(newUser.toJSON());
  logger.info(`Correo de bienvenida enviado a ${newUser.email}`);
  } catch (error) {
    logger.error(`Error al enviar mail de bienvenida: ${error.message}`);
  }  
  const {password: _, ...newUserWOutPass} = newUser.toJSON();
  return newUserWOutPass;
};

export async function searchByEmail(email) {
  return await User.findOne({where:{email}});
}; 

export async function searchById(id) {
  const user = await User.findByPk(id);
  if (!user) {
    return null;
  }
  return user;
}; 

export async function updateUser(id, data) {
  const updateData = {};
  if (data.name) {
    updateData.name = data.name;
  }
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, SALT_ROUNDS);
  }
  await User.update(updateData, {
    where: {id},
  });
  logger.info(`Usuario ${id} actualizado correctamente.`);
  return await searchById(id);
};

export async function deleteUser(id) {
  return await User.destroy({
    where: {id},
  });
  logger.info(`Usuario ${id} eliminado correctamente.`);
};
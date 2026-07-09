import bcrypt from "bcrypt";
import User from "../database/models/users.js";
import { checkAccessToken } from "../middlewares/auth-middleware.js";

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
  const updatedUser = await User.update(
    {name: data.name, password: data.password,},
    {where: {id},}
  );
  return updatedUser;
};

export async function deleteUser(id) {
  return await User.destroy({
    where: {id},
  });
};




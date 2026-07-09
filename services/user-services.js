import bcrypt from "bcrypt";
import User from "../database/models/users.js";

const SALT_ROUNDS = 10;

export async function create(data) {
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
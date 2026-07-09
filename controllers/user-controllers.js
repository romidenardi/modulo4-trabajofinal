import * as userServices from "../services/user-services.js";

export async function createUser(req, res) {
  try {
    const exists = await userServices.searchByEmail(req.body.email);
    if(exists){
      return res.status(409).json({error: "El email ya está registrado."});
      }
    const newUser = await userServices.createUser(req.body);
    res
      .status(201)
      .json({
        mensaje: `Usuario ${req.body.name} creado exitosamente.`,
        usuario: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      });
  } catch(error) {
      res
        .status(500)
        .json({error: "Error al crear el usuario: ", detalle: error.message});
  };
};

export function getProfile(req, res) {
  res
  .status(200)
  .json({mensaje: "Perfil obtenido correctamente.", usuario: req.loggedUser});
};

export async function updateUser(req, res) {
  try {
    const userId = req.loggedUser.id;
    const data = req.body;
    const updatedUser = await userServices.updateUser(userId, data);
    res
      .status(200)
      .json({mensaje: "Perfil actualizado correctamente.",usuario: updatedUser,});
  } catch (error) {
    res.status(500).json({error: "Error al actualizar el perfil.", detalle: error.message});
}};

export async function deleteUser(req, res) {
  try {
    const userId = req.loggedUser.id;
    const deletedUser = await userServices.deleteUser(userId);
    res
      .status(200)
      .json({mensaje: "Perfil eliminado correctamente."});
  } catch (error) {
    res.status(500).json({error: "Error al eliminar el perfil.", detalle: error.message,});
}};

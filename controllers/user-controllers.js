import * as userServices from "../services/user-services.js";

export async function create(req, res) {
  try {
    const exists = await userServices.searchByEmail(req.body.email);
    if(exists){
      return res.status(409).json({error: "El email ya está registrado."});
      }
    const newUser = await userServices.create(req.body);
    res
      .status(201)
      .json({mensaje: `Usuario ${req.body.name} creado exitosamente`});
  } catch(error) {
      res
        .status(500)
        .json({error: "Error al crear el usuario: ", detalle: error.message});
  };
};
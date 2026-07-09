import { body, validationResult } from "express-validator";

export const validateUserCreation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isLength({min:2})
    .withMessage("El nombre de usuario debe tener al menos dos caracteres"),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("Debés ingresar un email válido"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({min:8})
    .withMessage("La contraseña debe tener al menos ocho caracteres"),
  body("role")
    .notEmpty()
    .withMessage("El rol es obligatorio.")
    .isIn(["admin", "usuario"])
    .withMessage("El rol solo puede ser 'admin' o 'usuario'."),
];

export function validationErrorsHandler(req, res, next) {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).json({
      error: "Datos inválidos",
      detalles: errors.array(),
    });
  };
  next();
};
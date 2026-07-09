import { body, validationResult } from "express-validator";

export const validateUserCreation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isLength({min:2})
    .withMessage("El nombre de usuario debe tener al menos dos caracteres."),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("Debés ingresar un email válido."),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({min:8})
    .withMessage("La contraseña debe tener al menos ocho caracteres."),
  body("role")
    .optional()
    .isIn(["admin", "usuario"])
    .withMessage("El rol solo puede ser 'admin' o 'usuario'."),
];

export const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("Debés ingresar un email válido."),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria."),
];

export const validateUserUpdate = [
  body("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos dos caracteres."),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Debés ingresar un email válido."),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos ocho caracteres."),
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
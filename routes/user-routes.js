import { Router } from "express";
import { validationErrorsHandler, validateUserCreation, validateLogin, validateUserUpdate } from "../validators/user-validators.js";
import * as userControllers from "../controllers/user-controllers.js";
import { checkAccessToken } from "../middlewares/auth-middleware.js";

const router = Router();

router.post(
  "/",
  validateUserCreation,
  validationErrorsHandler,
  userControllers.createUser,
);

router.get(
  "/perfil",
  validateLogin,
  validationErrorsHandler,
  checkAccessToken,
  userControllers.getProfile,
);

router.put(
  "/",
  validateUserUpdate,
  validationErrorsHandler,
  checkAccessToken,
  userControllers.updateUser,
);

router.delete(
  "/",
  checkAccessToken,
  userControllers.deleteUser,
);

export default router;
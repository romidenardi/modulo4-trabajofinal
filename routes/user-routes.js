import { Router } from "express";
import { validationErrorsHandler, validateUserCreation, validateLogin, validateUserUpdate } from "../validators/user-validators.js";
import * as userControllers from "../controllers/user-controllers.js";
import { checkAccessToken } from "../middlewares/auth-middlewares.js";

const router = Router();

router.post(
  "/",
  validateUserCreation,
  validationErrorsHandler,
  userControllers.createUser,
);

router.get(
  "/perfil",
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
import { Router } from "express";
import * as authControllers from "../controllers/auth-controllers.js";
import { validateLogin, validationErrorsHandler } from "../validators/user-validators.js";

const router = Router();

router.post(
  "/login",
  validateLogin,
  validationErrorsHandler,
  authControllers.login,
);

export default router;
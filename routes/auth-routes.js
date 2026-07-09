import { Router } from "express";
import * as authControllers from "../controllers/auth-controllers.js";
import { checkAccessToken } from "../middlewares/auth-middleware.js";

const router = Router();

router.post(
  "/login",
  authControllers.login,
);

router.get(
  "/perfil",
  checkAccessToken,
  authControllers.profile,
);

export default router;
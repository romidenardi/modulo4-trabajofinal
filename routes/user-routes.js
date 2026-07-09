import { Router } from "express";
import { validationErrorsHandler, validateUserCreation } from "../validators/user-validators.js";
import * as userControllers from "../controllers/user-controllers.js";

const router = Router();

router.post(
  "/usuarios", 
  validateUserCreation, 
  validationErrorsHandler,
  userControllers.create,
);

export default Router();
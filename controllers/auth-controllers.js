import * as authServices from "../services/auth-services.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authServices.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  };
};
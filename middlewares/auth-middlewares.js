import { verifyAccessToken } from "../tokens/user-tokens.js";

export function checkAccessToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            error: "Token no proporcionado",
        });
    };
    const token = authHeader.split(" ")[1];
    try {
        const decoded = verifyAccessToken(token);
        req.loggedUser = decoded;
        next();
    } catch {
        return res.status(403).json({
            error: "Token inválido o expirado",
        });
    };
};
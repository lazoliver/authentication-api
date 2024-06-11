import { Request, Response, NextFunction } from "express";
import verifyToken from "../helpers/verify-token";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
}

export default authMiddleware;

import { Request, Response, Router } from "express";
import authMiddleware from "../middlewares/auth";

const router = Router();

router.get("/health", authMiddleware, (req: Request, res: Response) => {
  res.json({ status: "pass" });
});

export default router;

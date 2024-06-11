import { Request, Response, Router } from "express";
import authController from "../controllers/auth";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  await authController.register(req, res);
});

export default router;

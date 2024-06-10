import { Request, Response, Router } from "express";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  res.json({ status: "pass" });
});

export default router;

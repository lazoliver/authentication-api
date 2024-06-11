import { Router } from "express";
import utilsRoutes from "./utils";
import authRoutes from "./auth";

const router = Router();

router.use("/utils", utilsRoutes);
router.use("/auth", authRoutes);

export default router;

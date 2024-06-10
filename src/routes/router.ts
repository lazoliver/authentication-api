import { Router } from "express";
import utilsRouter from "./utils";

const router = Router();

router.use("/utils", utilsRouter);

export default router;

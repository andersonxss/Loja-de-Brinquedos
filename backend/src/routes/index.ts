import { Router } from "express";
import clientRoutes from "./clientRoutes";
import saleRoutes from "./saleRoutes";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/clients", clientRoutes);
router.use("/sales", saleRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;

import { Router } from "express";
import { saleController } from "../controllers/saleController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateDto } from "../middlewares/validateDto";
import { CreateSaleDto } from "../dto/sales/CreateSaleDto";

const router = Router();

// router.use(authMiddleware);

router.post("/", validateDto(CreateSaleDto), saleController.create);
router.get("/", saleController.list);
router.get("/stats", saleController.stats);
router.get("/stats/clients", saleController.statsClients);

export default router;

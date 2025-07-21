import { Router } from "express";
import { clientController } from "../controllers/clientController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateDto } from "../middlewares/validateDto";
import { CreateClientDto } from "../dto/clients/CreateClientDto";
import { UpdateClientDto } from "../dto/clients/UpdateClientDto";

const router = Router();

router.use(authMiddleware);

router.post("/", validateDto(CreateClientDto), clientController.create);
router.get("/paginated", clientController.listPaginated);
router.get("/", clientController.list);
router.put("/:id", validateDto(UpdateClientDto), clientController.update);
router.delete("/:id", clientController.remove);

export default router;

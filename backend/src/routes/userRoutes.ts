import { Router } from "express";
import { userController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { CreateUsersDto } from "../dto/users/CreateUsersDto";
import { UpdateUsersDto } from "../dto/users/UpdateUsersDto";
import { validateDto } from "../middlewares/validateDto";

const router = Router();
router.use(authMiddleware);

router.post("/", validateDto(CreateUsersDto), userController.create); // cadastro público
router.get("/", userController.list);
router.put("/:id", validateDto(UpdateUsersDto), userController.update);
router.delete("/:id", userController.delete);

export default router;

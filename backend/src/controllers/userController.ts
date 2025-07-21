import { Request, Response } from "express";
import CreateUserServices from "../services/user/createUserServices";
import UpdateUserServices from "../services/user/updateUserServices";
import ListUserServices from "../services/user/listUserServices";
import DeleteUserServices from "../services/user/deleteUserServices";
import AppError from "../middlewares/AppError";

export const userController = {
  async create(req: Request, res: Response) {
    try {
      const createUserServices = new CreateUserServices();
      const user = await createUserServices.execute(req.body);
      return res.status(201).json(user);
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      return res.status(500).json({ message: "Erro ao criar usuário" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updateUserServices = new UpdateUserServices();
      const user = await updateUserServices.execute(data, id);
      return res.json(user);
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      return res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const listUserServices = new ListUserServices();
      const users = await listUserServices.execute();
      return res.json(users);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao listar usuários" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleteUserServices = new DeleteUserServices();
      await deleteUserServices.execute(id);
      return res.json({ message: "Usuário removido com sucesso" });
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      return res.status(500).json({ message: "Erro ao remover usuário" });
    }
  },
};

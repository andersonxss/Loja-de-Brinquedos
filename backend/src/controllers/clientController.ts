import { Request, Response } from "express";
import CreateClientsServices from "../services/clients/createClientsServices";
import UpdateClientsServices from "../services/clients/updateClientsServices";
import ListClientsPaginatedServices from "../services/clients/listClientsPaginatedServices";
import ListClientsServices from "../services/clients/listClientsServices";
import DeleteClientsServices from "../services/clients/deleteClientsServices";
import AppError from "../middlewares/AppError";

export const clientController = {
  async create(req: Request, res: Response) {
    const { name, email, dataNascimento } = req.body;
    try {
      const createClientsServices = new CreateClientsServices();
      const client = await createClientsServices.execute({
        name,
        email,
        dataNascimento,
      });
      return res.status(201).json(client);
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      return res.status(500).json({ message: "Erro ao criar cliente" });
    }
  },
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, dataNascimento } = req.body;
    try {
      const updateClientsServices = new UpdateClientsServices();
      const client = await updateClientsServices.execute(
        {
          name,
          email,
          dataNascimento,
        },
        Number(id)
      );
      return res.json(client);
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      return res.status(500).json({ message: "Erro ao atualizar cliente" });
    }
  },
  async listPaginated(req: Request, res: Response) {
    try {
      const { page, limit, search }: any = req.query;

      const listClientsPaginatedServices = new ListClientsPaginatedServices();
      const clients = await listClientsPaginatedServices.execute({
        page,
        limit,
        search,
      });
      return res.json(clients);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao listar clientes" });
    }
  },
  async list(req: Request, res: Response) {
    try {
      const listClientsServices = new ListClientsServices();
      const clients = await listClientsServices.execute();
      return res.json(clients);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao listar clientes" });
    }
  },
  async remove(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deleteClientsServices = new DeleteClientsServices();
      await deleteClientsServices.execute(id);
      return res.status(204).send();
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      return res.status(500).json({ message: "Erro ao remover cliente" });
    }
  },
};

import { Request, Response } from "express";
import CreateSalesServices from "../services/sales/createSalesServices";
import ListSalesServices from "../services/sales/listSalesServices";
import ListStatsSalesServices from "../services/sales/listStatsSalesServices";
import ListStatsClientsSalesServices from "../services/sales/listStatsClientsSalesServices";

export const saleController = {
  async create(req: Request, res: Response) {
    const { clientId, value, saleDate } = req.body;
    const createSalesServices = new CreateSalesServices();
    try {
      const sale = await createSalesServices.execute({
        clientId,
        value,
        saleDate,
      });
      return res.status(201).json(sale);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao criar venda" });
    }
  },
  async list(req: Request, res: Response) {
    const listSalesServices = new ListSalesServices();
    try {
      const sales = await listSalesServices.execute();
      return res.json(sales);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao listar vendas" });
    }
  },
  async stats(req: Request, res: Response) {
    const listStatsSalesServices = new ListStatsSalesServices();
    try {
      const stats = await listStatsSalesServices.execute();
      return res.json(stats);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao obter estatísticas" });
    }
  },
  async statsClients(req: Request, res: Response) {
    const listStatsClientsSalesServices = new ListStatsClientsSalesServices();
    try {
      const stats = await listStatsClientsSalesServices.execute();
      return res.json(stats);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao obter estatísticas" });
    }
  },
};

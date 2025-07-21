import { Request, Response } from "express";
import AuthUserServices from "../services/user/authUserServices";
import AppError from "../middlewares/AppError";

export const authController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const authUserServices = new AuthUserServices();
      const token = await authUserServices.execute({ email, password });
      return res.json({ token });
    } catch (err) {
      if (err instanceof AppError) {
        return res
          .status(err.statusCode)
          .json({ message: err.message, statusCode: err.statusCode });
      }
      return res.status(500).json({ message: "Erro ao autenticar usuário" });
    }
  },
};

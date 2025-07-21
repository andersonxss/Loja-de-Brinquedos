import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Erro inesperado:", err);
  res.status(500).json({ message: "Erro interno do servidor" });
}

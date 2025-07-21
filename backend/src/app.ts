import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { AppDataSource } from "./data-source";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

AppDataSource.initialize()
  .then(() => console.log("Banco de dados conectado!"))
  .catch((err) => console.error("Erro ao conectar no banco:", err));

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

// Rotas serão adicionadas aqui

export default app;

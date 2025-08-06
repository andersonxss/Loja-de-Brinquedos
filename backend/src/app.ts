import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Configurar Swagger primeiro (antes das rotas da API)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas da API
app.use("/api", routes);
app.use(errorHandler);

export default app;

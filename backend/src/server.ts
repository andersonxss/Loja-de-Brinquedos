import app from "./app";
import "reflect-metadata";
import { AppDataSource } from "./data-source";

const PORT = process.env.PORT || 3333;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
    console.log("Banco de dados conectado!");
  })
  .catch((err) => {
    console.error("Erro ao conectar no banco:", err);
  });

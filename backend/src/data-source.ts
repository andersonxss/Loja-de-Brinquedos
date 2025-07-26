import "reflect-metadata";
import { DataSource } from "typeorm";
import { Client } from "./entities/Client";
import { Sale } from "./entities/Sale";
import { User } from "./entities/User";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: Number(process.env.PORTDB),
  username: process.env.USERDB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [Client, Sale, User],
  synchronize: false, // Use migrations!
  logging: false,
  // migrations: ["src/migrations/*.ts"],
  migrations: [
    process.env.NODE_ENV === "production"
      ? "dist/migrations/*.js"
      : "src/migrations/*.ts",
  ],
});

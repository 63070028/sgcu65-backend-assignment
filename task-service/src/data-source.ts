import { DataSource } from "typeorm";
import { Task } from "./task/models/Task";
import dotnev from "dotenv";

dotnev.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Task],
    subscribers: [],
    migrations: [],
})
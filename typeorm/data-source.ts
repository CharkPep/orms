import {DataSource} from "typeorm";
import {User} from "./UserSchema";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "pep",
    password: "0001",
    database: "mydb",
    synchronize: true,
    logging: ['error', 'warn'],
    entities: [User],
    subscribers: [],
    migrations: [],
    maxQueryExecutionTime: 1000
})

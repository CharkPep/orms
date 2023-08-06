import {DataSource} from "typeorm";
import {Customers_typeorm} from "./CustomerSchema";
import {BankAccount} from "./BankAccountSchema";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "pep",
    password: "0001",
    database: "mydb",
    synchronize: true,
    logging: ['error', 'warn'],
    entities: [Customers_typeorm, BankAccount],
    subscribers: [],
    migrations: [],
    maxQueryExecutionTime: 1000
})

import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'pep',
      password : '0001',
      database : 'mydb'
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
};

module.exports = config;

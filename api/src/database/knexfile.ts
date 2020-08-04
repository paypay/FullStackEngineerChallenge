require("dotenv-flow").config({
  path: `../../`,
});

module.exports = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: "UTC",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    extension: "ts",
    directory: `${__dirname}/migrations`,
    disableTransactions: true,
  },
  seeds: {
    directory: __dirname + "/seeds",
  },
  timezone: "UTC",
};

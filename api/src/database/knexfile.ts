require("dotenv-flow").config({
  path: `../../`,
});

module.exports = {
  client: process.env.DB_CLIENT,
  version: process.env.DB_VERSION,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      require: process.env.DB_SSL,
      rejectUnauthorized: false,
    },
    timezone: "UTC",
  },
  pool: {
    min: 2,
    max: 8,
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

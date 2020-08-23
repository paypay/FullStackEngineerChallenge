import knex from "knex";

const setupKnex = () => {
  return knex({
    client: process.env.DB_CLIENT,
    version: process.env.DB_VERSION,
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
      timezone: "UTC",
    },
  });
};

export default setupKnex;

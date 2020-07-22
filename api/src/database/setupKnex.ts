import knex from "knex";

const setupKnex = () => {
  return knex({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone: "UTC",
    },
  });
};

export default setupKnex;

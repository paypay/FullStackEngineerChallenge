// Load testing env variables
require("dotenv-flow").config();

import db from "../../src/database";

interface TABLE_SCHEMA {
  TABLE_NAME: string;
}

// Remove tables from test database
export default async () => {
  await db.raw("SET FOREIGN_KEY_CHECKS=0;");

  const [tables] = await db.raw<[TABLE_SCHEMA[]]>(
    `SELECT DISTINCT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${process.env.DB_NAME}'`
  );

  tables.map(async ({ TABLE_NAME }: TABLE_SCHEMA) => {
    await db.raw(`DROP TABLE IF EXISTS ${TABLE_NAME}`);
  });

  // Re enable foreign key checks
  await db.raw("SET FOREIGN_KEY_CHECKS=1;");

  // Close connection
  await db.destroy();
};

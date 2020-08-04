import * as Knex from "knex";

interface TABLE_SCHEMA {
  TABLE_NAME: string;
}

export const cleanup = async (db: Knex) => {
  await db.raw("SET FOREIGN_KEY_CHECKS=0;");

  const [tables] = await db.raw<[TABLE_SCHEMA[]]>(
    `SELECT DISTINCT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${process.env.DB_NAME}'`
  );

  //After each test, clean every table
  await Promise.all(
    tables.map(async ({ TABLE_NAME }: TABLE_SCHEMA) => {
      // Delete data and reset auto-increment value
      await db(TABLE_NAME).del();
      // Reset auto increment
      await db.raw(`ALTER TABLE ${TABLE_NAME} AUTO_INCREMENT = 1`);
    })
  );

  // Re enable foreign key checks
  await db.raw("SET FOREIGN_KEY_CHECKS=1;");

  // Close connection
  await db.destroy();
};

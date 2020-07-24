import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("assignment", function (table) {
    table.increments("id").primary();
    table.integer("userId").unsigned();
    table.integer("revieweeId").unsigned();
    table
      .enum("status", ["PENDING", "COMPLETED"])
      .notNullable()
      .defaultTo("PENDING");
    table.foreign("userId").references("user.id").onDelete("CASCADE");
    table.foreign("revieweeId").references("user.id").onDelete("CASCADE");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("assignment");
}

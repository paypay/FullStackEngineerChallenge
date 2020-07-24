import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("review", function (table) {
    table.increments("id").primary();
    table.integer("assignmentId").unsigned();

    table.text("comment").nullable();
    table.integer("attitude").notNullable();
    table.integer("communication").notNullable();
    table.integer("growth").notNullable();
    table.integer("dependability").notNullable();
    table.integer("productivity").notNullable();
    table.integer("initiative").notNullable();
    table.integer("innovation").notNullable();
    table
      .foreign("assignmentId")
      .references("assignment.id")
      .onDelete("CASCADE");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("review");
}

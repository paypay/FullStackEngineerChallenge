import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("user", function (table) {
    table.string("address").nullable();
    table.string("phone").nullable();
    table.string("mobilePhone").nullable();
    table.date("birthday").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("user", function (table) {
    table.dropColumn("address");
    table.dropColumn("phone");
    table.dropColumn("mobilePhone");
    table.dropColumn("birthday");
  });
}

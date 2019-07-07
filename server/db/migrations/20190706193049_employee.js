exports.up = function(knex) {
  return knex.schema.createTable("employee", function(table) {
    table.increments();
    table.string("name", 50).notNullable();
    table.string("employee_id", 10).notNullable();
    table.integer("admin", 1).defaultTo(0);
    table.integer("created_at").notNullable();
    table.integer("updated_at").notNullable();
    table.unique("employee_id");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("employee");
};

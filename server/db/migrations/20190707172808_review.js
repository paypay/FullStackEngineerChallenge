exports.up = function(knex) {
  return knex.schema.createTable("review", function(table) {
    table.increments();
    table.integer("reviewer").notNullable();
    table.integer("reviewee").notNullable();
    table.string("text", 500);
    table.unique(["reviewer", "reviewee"]);
    table.foreign("reviewer").references("employee.id");
    table.foreign("reviewee").references("employee.id");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("review");
};

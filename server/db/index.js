const knex = require("knex");
const conf = require("./knexfile");
const db = knex(conf.development);
module.exports = db;

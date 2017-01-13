
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('username')
    table.string('password')
    table.text('jwt')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};

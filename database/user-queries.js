const knex = require('./knex')

function create (user) {
  return knex('users').returning('id').insert(user);
}

function login (user) {
  return knex('users').where('username', user.username);
}

module.exports = {
  create,
  login
}

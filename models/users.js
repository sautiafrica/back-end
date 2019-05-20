const db = require('../database/dbConfig.js');
const table = 'auth'
module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db(table).select('id', 'username', 'password');
}

function findBy(filter) {
  return db(table).where(filter);
}

async function add(user) {
  const [id] = await db(table).insert(user);
  return findById(id);
}

function findById(id) {
  return db(table)
    .where({ id })
    .first();
}

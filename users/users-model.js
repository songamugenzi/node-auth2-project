const db = require("../database/connection.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users as u")
    .join("departments as d", "u.department", "d.id")
    .select("u.id", "u.username", "d.name as departmentname");
}

function findBy(filter) {
  return db("users as u")
    .join("departments as d", "u.department", "d.id")
    .select("u.id", "u.username", "d.name as departmentname", "u.password")
    .where(filter)
    .orderBy("u.id");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");
    return findById(id);
  } catch (err) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id }).first();
}

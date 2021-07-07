exports.seed = function (knex) {
  const departments = [
    {
      name: "Finance",
    },
    {
      name: "Human Resources",
    },
    {
      name: "Shipping",
    },
  ];

  return knex("departments")
    .insert(departments)
    .then(() => console.log("\n== Seed data for roles table added. ==\n"));
};

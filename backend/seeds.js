"use strict";
require("dotenv").config({
  path: __dirname + "/.env"
});
const fs = require("fs");
const path = require("path");
const dbConfig = require("./helpers/db-config");

(async () => {
  await dbConfig.open();
})();

const Employee = require("./app/employees/Employee");

const {
  adminEmployee,
} = require("./seeddata");

async function deleteData() {
  console.log("😢 Goodbye Data...");
  await Employee.deleteMany();
  console.log("Data Deleted. To load sample data, run\n\n\t npm run seeds\n\n");
  process.exit();
}

async function seedRandomNtoN(arrayOfRecords, relationship, model) {
  arrayOfRecords.map((record, index) => {
    var randomSetter = Math.floor(
      Math.random(relationship.length) * relationship.length + 1
    );
    record[model.collection.name] = [];
    for (let i = 0; i < randomSetter; i++) {
      return (record[model.collection.name][i] = relationship[
        randomSetter - 1
      ]._id.toString());
    }
  });
  return arrayOfRecords;
}

async function loadData() {
  try {
    await Employee.create(adminEmployee);
    console.log(`You can now login as: `);
    console.log(`Email: ${adminEmployee.email} Password: password`);

    console.log("👍 Done!\n\n Successfully loaded sample data");
    process.exit();
  } catch (e) {
    console.log(
      "\n👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes("--delete")) {
  deleteData();
} else {
  loadData();
}

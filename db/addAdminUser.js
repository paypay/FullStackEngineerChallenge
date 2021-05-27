const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Employee = require("./models/employee");
const addAdminUser = () => {
  const db = mongoose.connection;
  db.once("open", async () => {
    console.log("Connection Successful!");
    const employees = await Employee.findOne({ isAdmin: true });
    const admin = new Employee({
      name: "admin",
      email: "admin@paypay.com",
      password: "password",
      reviewer: true,
      isAdmin: true,
    });
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
    if (!employees) {
      admin.save(function (err, user) {
        if (err) return console.error(err);
        console.log(user.name + " saved to Employee collection.");
      });
    }
  });
};

module.exports = addAdminUser;

const express = require("express");
const verifyToken = require("../auth/verifyToken");
const {
  fetchEmployees,
  updateEmployee,
  addEmployee,
  deleteEmployee,
} = require("../controllers/employee");

const router = express.Router();

router.get("/employees", verifyToken, fetchEmployees);
router.post("/employee", verifyToken, addEmployee);
router.put("/employee/:employeeId", verifyToken, updateEmployee);
router.delete("/employee/:employeeId", verifyToken, deleteEmployee);

module.exports = router;

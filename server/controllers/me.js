const Employee = require("../../db/models/employee");
const me = async (req, res) => {
  try {
    const employees = await Employee.findById(req.userId);
    const { name, isAdmin, _id, reviewer } = employees;
    return res.status(200).json({
      success: true,
      isAdmin,
      name,
      reviewer,
      id: _id,
    });
  } catch (err) {
    return res.status(500).json(serializeError(err));
  }
};

module.exports = me;

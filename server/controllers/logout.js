const logout = (req, res) => {
  res.status(200).send({ token: null, message: "Successfully logout." });
};

module.exports = logout;

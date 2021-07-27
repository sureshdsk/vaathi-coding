const { getExercises } = require("../data");

module.exports = (req, res) => {
  res.status(200).json({ data: getExercises() });
};

const { serializeError } = require("serialize-error");
const Feedback = require("../../db/models/feedback");

const getFeedbacks = async (req, res) => {
  try {
    const Feedbacks = await Feedback.find();
    return res.status(200).json(Feedbacks);
  } catch (err) {
    return res.status(500).json(serializeError(err));
  }
};
const saveFeedback = async (req, res) => {
  const {
    body: {
      employeeId,
      comments: { text, name },
    },
  } = req;
  const feedback = new Feedback({ employeeId, comments: { text, name } });
  try {
    const saveFeedback = await feedback.save();
    res.status(201).json(saveFeedback);
  } catch (err) {
    return res.status(500).json(serializeError(err));
  }
};

module.exports = {
  getFeedbacks,
  saveFeedback,
};

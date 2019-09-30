const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Feedback = require("../../models/Feedback");

// @route POST api/feedback/
// @desc add feedback record
// @access Restricted to logged in user only
router.post("/save", auth, (req, res) => {

    // Create new feedback document
    const newFeedback = new Feedback({
        feedbackToName: req.body.feedbackToName,
        feedbackToEmail: req.body.feedbackToEmail,
        feedbackByName: req.body.feedbackByName,
        feedbackByEmail: req.body.feedbackByEmail,
        notes: req.body.note,
        comments: req.body.comments,
        requestedByName: req.body.requestedByName,
        requestedByEmail: req.body.requestedByEmail
    });

    newFeedback.save()
        .then(feedback => res.json(feedback))
        .catch(err => res.status(500).send(err));
});

router.get("/fetch", auth, (req, res) => {
    const isAdmin = req.user.role === 'admin';
    const options = {};
    if (!isAdmin) {
        options.feedbackByEmail = req.user.email;
    }
    Feedback.find(options)
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err));
});

router.delete("/delete", auth, (req, res) => {
    if (!req.body.id) {
        res.status(400).send("Feedback id not provided");
        return;
    }

    Feedback.findById(req.body.id)
        .then(feedback => {
            Feedback.deleteOne({ _id: feedback._id }).then(() => {
                res.send({ success: true });
            }).catch(e => {
                res.status(500).send(e);
            });
        })
        .catch(e => res.status(500).send(e))
});

router.put("/edit", auth, async (req, res) => {
    if (!req.body.id) {
        res.status(400).send("Feedback id not provided");
        return;
    }

    let feedback;
    try {
        feedback = await Feedback.findById(req.body.id);
    }
    catch (err) {
        res.status(500).send(e);
        return;
    }

    // Update feedback document
    feedback.feedbackToName = req.body.feedbackToName;
    feedback.feedbackToEmail = req.body.feedbackToEmail;
    feedback.feedbackByName = req.body.feedbackByName;
    feedback.feedbackByEmail = req.body.feedbackByEmail;
    feedback.notes = req.body.note;
    feedback.comments = req.body.comments;

    feedback.save()
        .then(feedback => res.json(feedback))
        .catch(err => res.status(500).send(err));
});

module.exports = router;
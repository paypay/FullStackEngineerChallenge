const { gql } = require('apollo-server');
const Feedback = require("./Feedback");

module.exports.feedbackTypeDefs = gql`
    extend type Query {
        feedbacks: [Feedback]
    }
    extend type Mutation {
        addFeedback(feedback: FeedbackData): Feedback
    }
    type Feedback {
        id: String,
        text: String,
        review: Review,
        employee: Employee,
        createdAt: String!
    }
    input FeedbackData {
        text: String,
        review: String,
        employee: String,
    }
`;

module.exports.feedbackResolvers = {
    Query: {
        feedbacks: async () => await Feedback.find({}).populate('review').populate('employee').exec({}),
    },
    Mutation: {
        addFeedback: async (_, payload, context) => {
            try {
                let createdFeedback = await Feedback.create({ ...payload.feedback })
                console.log('createdFeedback', createdFeedback);
                createdFeedback = await createdFeedback.populate('review').populate('employee').execPopulate()
                return createdFeedback
            } catch (error) {
                console.log('error', error);
                return error
            }
        },
    }
}

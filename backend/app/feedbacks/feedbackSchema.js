const { ApolloServer, gql } = require('apollo-server');
const Feedback = require("./Feedback");

module.exports.feedbackTypeDefs = gql`
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
    Mutation: {
        addFeedback: async (_, payload, context) => {
            try {
                let createdFeedback = await Feedback.create({ ...payload.feedback })
                console.log('createdFeedback', createdFeedback);
                createdFeedback = await createdFeedback.populate('review').populate('employee').execPopulate()
                console.log('createdFeedback', createdFeedback);
                return createdFeedback
            } catch (error) {
                console.log('error', error);
                return error
            }
        },
    }
}

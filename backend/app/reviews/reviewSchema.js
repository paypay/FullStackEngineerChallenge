const { gql } = require('apollo-server');
const Review = require("./Review");

module.exports.reviewTypeDefs = gql`
    extend type Query {
        reviews: [Review]
    }
    extend type Mutation {
        addReview(review: ReviewData): Review
        destroyReview(id: ID): ID
    }
    type Review {
        id: String,
        score: Float,
        employee: Employee,
        createdAt: String!
    }
    input ReviewData {
        score: Float,
        employee: String,
        id: String
    }
`;
module.exports.reviewResolvers = {
    Query: {
        reviews: () => Review.find({}).populate('employee').exec({}),
    },
    Mutation: {
        addReview: async (_, payload, context) => {
            let createdReview
            try {
                if (payload.review.id) {
                    createdReview = await Review.findByIdAndUpdate(payload.review.id, payload.review).populate('employee').exec({})
                    return createdReview
                } else {
                    createdReview = await Review.create({ ...payload.review })
                    createdReview = await createdReview.populate('employee').execPopulate()
                    return createdReview
                }
            } catch (error) {
                console.log('error', error);
                return error
            }
        },
        destroyReview: async (_, payload, context) => {
            await Review.findByIdAndDelete(payload.id)
            return payload.id
        },
    }
}

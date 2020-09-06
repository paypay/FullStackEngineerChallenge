const { ApolloServer, gql } = require('apollo-server');
const Review = require("./Review");
const AuthController = require("../auth/authController");
const sendVerificationMail = require("../../helpers/mailer");

module.exports.reviewTypeDefs = gql`
    extend type Query {
        reviews: [Review]
    }
    type Review {
        id: String,
        score: Float,
        employee: Employee,
        createdAt: String!
    }
    input ReviewData {
        date: String,
    }
`;

module.exports.reviewResolvers = {
    Query: {
        reviews: () => Review.find({}).populate('employee').exec({}),
    },
    Mutation: {

    }
}

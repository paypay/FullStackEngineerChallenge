require("dotenv").config({ path: "./.env" });
const Employee = require("./app/employees/Employee");
const Review = require("./app/reviews/Review");
const Feedback = require("./app/feedbacks/Feedback");
const dbConfig = require("./helpers/db-config");
const port = process.env.PORT || 8080;
const { defaultEmployees, defaultFeedbacks, seedRandomNtoN, seedRandomNtoOne, defaultReviews } = require("./seeddata");
const { ApolloServer, gql } = require('apollo-server');
const path = require("path");
const { createWriteStream, unlink } = require('fs')
const {
  authTypeDefs,
  authResolvers
} = require("./app/auth/authSchema");
const {
  employeeTypeDefs,
  employeeResolvers
} = require("./app/employees/employeeSchema");
const {
  reviewTypeDefs,
  reviewResolvers
} = require("./app/reviews/reviewSchema");
const {
  feedbackTypeDefs,
  feedbackResolvers
} = require("./app/feedbacks/feedbackSchema");

const initialTypeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
const initialResolvers = {
  Query: {},
  Mutation: {},
};
const typeDefs = [
  initialTypeDefs,
  employeeTypeDefs,
  authTypeDefs,
  feedbackTypeDefs,
  reviewTypeDefs
]
const resolvers = [
  initialResolvers,
  employeeResolvers,
  authResolvers,
  feedbackResolvers,
  reviewResolvers
]
const uuidv4 = require("uuid/v4");
const UPLOAD_DIR = './uploads'

dbConfig.open().then(async () => {
  await Employee.deleteMany();
  await Review.deleteMany();
  await Feedback.deleteMany();
  const createdEmployees = await Employee.create(defaultEmployees);
  var associatedReviews = await seedRandomNtoOne(
    defaultReviews,
    createdEmployees,
    Employee
  );
  const createdReviews = await Review.insertMany(associatedReviews)

  var associatedFeedbacks = await seedRandomNtoOne(
    defaultFeedbacks,
    createdEmployees,
    Employee
  );
  associatedFeedbacks = await seedRandomNtoOne(
    associatedFeedbacks,
    createdReviews,
    Review
  );
  await Feedback.insertMany(associatedFeedbacks)
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        const authorization = req.headers.authorization
        return {
          authorization
        }
      }
    });
    server.listen(process.env.PORT, () => {
      console.log("Server listening at %s", process.env.PORT);
    });
  } catch (error) {
    console.debug('error', error);
  }
});

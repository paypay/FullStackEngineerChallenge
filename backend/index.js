require("dotenv").config({ path: "./.env" });
const User = require("./app/users/User");
const dbConfig = require("./helpers/db-config");
const port = process.env.PORT || 8080;
const { adminUser } = require("./seeddata");
const { ApolloServer, gql } = require('apollo-server');
const path = require("path");
const { createWriteStream, unlink } = require('fs')
const {
  employeeTypeDefs,
  employeeRsolvers
} = require("./schemas/employee");

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
  employeeTypeDefs
]
const resolvers = [
  initialResolvers,
  employeeRsolvers,
]
const uuidv4 = require("uuid/v4");
const UPLOAD_DIR = './uploads'


dbConfig.open().then(async () => {
  const user = await User.findOne({ email: "admin@example.com" });
  if (!user) {
    await User.create(adminUser);
  }
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      uploads: {
        maxFileSize: 10000000, // 10 MB
        maxFiles: 20
      },
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

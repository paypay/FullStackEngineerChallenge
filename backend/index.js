require("dotenv").config({ path: "./.env" });
const Employee = require("./app/employees/Employee");
const dbConfig = require("./helpers/db-config");
const port = process.env.PORT || 8080;
const { defaultEmployees } = require("./seeddata");
const { ApolloServer, gql } = require('apollo-server');
const path = require("path");
const { createWriteStream, unlink } = require('fs')
const {
  employeeTypeDefs,
  employeeRsolvers
} = require("./app/schemas/employee");

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
  const employee = await Employee.findOne({ email: "admin@example.com" });
  if (!employee) {
    await Employee.create(defaultEmployees);
  }
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

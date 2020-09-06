const { ApolloServer, gql } = require('apollo-server');
const Employee = require("./Employee");
const AuthController = require("../auth/authController");
const sendVerificationMail = require("../../helpers/mailer");

module.exports.employeeTypeDefs = gql`
    extend type Query {
        employees: [Employee]
        update(title: Int): Employee
        employee(id: Int): Employee
    }
    extend type Mutation {
        login(email: String, password: String): LoginSuccess
        destroyEmployee(id: ID): ID
    }
    type Employee {
        id: String,
        email: String,
        name: String,
        role: String,
        password: String,
        createdAt: String,
        verifiedAt: String,
    }
    type LoginSuccess {
        jwtToken: String
    }
    type Response {
        id: String
    }
`;

module.exports.employeeResolvers = {
    Query: {
        employees: () => Employee.find({}).exec({}),
    },
    Mutation: {
        //TODO scope in auth schema
        login: async (_, payload, context) => {
            return AuthController.signin({ body: { email: payload.email, password: payload.password } }, context)
        },
        destroyEmployee: async (_, payload, context) => {
            await Employee.findByIdAndDelete(payload.id)
            return payload.id
        },
    }
}

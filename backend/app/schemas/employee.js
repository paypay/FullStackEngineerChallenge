const { ApolloServer, gql } = require('apollo-server');
const Employee = require("../employees/Employee");
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
    type Review {
        id: String,
        score: Float,
        participants: Employee,
        createdAt: String!
    }
    input ReviewData {
        date: String,
    }
    type LoginSuccess {
        jwtToken: String
    }
    type Response {
        success: Boolean
    }
`;

module.exports.employeeRsolvers = {
    Query: {
        employees: () => Employee.find({}).populate('items').exec({}),
        update: () => Employee.find(),
    },
    Mutation: {
        login: async (_, payload, context) => {
            return AuthController.signin({ body: { email: payload.email, password: payload.password } }, context)
        },
    }
}

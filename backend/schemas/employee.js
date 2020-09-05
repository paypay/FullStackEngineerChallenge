const { ApolloServer, gql } = require('apollo-server');
const User = require("../app/users/User");
const AuthController = require("../app/auth/authController");
const sendVerificationMail = require("../helpers/mailer");

module.exports.employeeTypeDefs = gql`
    extend type Query {
        employees: [employee]
        update(title: Int): employee
        employee(id: Int): employee
    }
    extend type Mutation {
        login(email: String, password: String): LoginSuccess
        sendemployee(message: employeeMailData) : Response
    }
    input employeeMailData {
        to: String,
        subject: String,
        body: String,
    }
    type employee {
        id: String,
        user: String,
        title: String,
        paid: Boolean,
        is_offer: Boolean,
        is_taxfree: Boolean,
        date: String,
        number: Int,
        notes: String,
        private_note: String,
        items: [ Item ]
        createdAt: String
    }
    type Item {
        id: String,
        date: String,
        description: String,
        hours: Int,
        minutes: Int,
        price: Int,
        is_expense: Boolean
        createdAt: String!
    }
    input ItemData {
        date: String,
        description: String,
        hours: Int,
        minutes: Int,
        price: Int,
        is_expense: Boolean
    }
    type LoginSuccess {
        jwtToken: String
    }
    input employeeData {
        title: String,
        location: String,
        paid: Boolean,
        is_offer: Boolean,
        is_taxfree: Boolean,
        date: String,
        number: Int,
        notes: String,
        private_note: String,
        client: String,
        items: [ ItemData ]
    }
    type Response {
        success: Boolean
    }
`;

module.exports.employeeRsolvers = {
    Query: {
        employees: () => employee.find({}).populate('items').exec({}),
        update: () => employee.find(),
    },
    Mutation: {
        login: async (_, payload, context) => {
            return AuthController.signin({ body: { email: payload.email, password: payload.password } }, context)
        },
    }
}

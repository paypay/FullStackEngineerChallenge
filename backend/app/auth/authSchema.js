const { gql } = require('apollo-server');
const AuthController = require("../auth/authController");

module.exports.authTypeDefs = gql`
    extend type Mutation {
        login(email: String, password: String): LoginSuccess
    }
    type LoginSuccess {
        jwtToken: String
    }
`;

module.exports.authResolvers = {
    Query: {
    },
    Mutation: {
        login: async (_, payload, context) => {
            return AuthController.signin({ body: { email: payload.email, password: payload.password } }, context)
        },
    }
}

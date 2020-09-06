const { ApolloServer, gql } = require('apollo-server');
const Employee = require("./Employee");

module.exports.employeeTypeDefs = gql`
    extend type Query {
        employees: [Employee]
        update(title: Int): Employee
        employee(id: Int): Employee
    }
    extend type Mutation {
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

    type Response {
        id: String
    }
`;

module.exports.employeeResolvers = {
    Query: {
        employees: () => Employee.find({}).exec({}),
    },
    Mutation: {
        destroyEmployee: async (_, payload, context) => {
            await Employee.findByIdAndDelete(payload.id)
            return payload.id
        },
    }
}

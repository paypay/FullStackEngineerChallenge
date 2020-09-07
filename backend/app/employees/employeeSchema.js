const { ApolloServer, gql } = require('apollo-server');
const Employee = require("./Employee");

module.exports.employeeTypeDefs = gql`
    extend type Query {
        employees: [Employee]
        update(title: Int): Employee
        employee(id: Int): Employee
    }
    extend type Mutation {
        addEmployee(employee: EmployeeData): Employee
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
    input EmployeeData {
        email: String,
        name: String,
        role: String,
        id: String
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
        addEmployee: async (_, payload, context) => {
            let createdEmployee
            try {
                if (payload.employee.id) {
                    createdEmployee = await Employee.findByIdAndUpdate(payload.employee.id, payload.employee)
                    return createdEmployee
                } else {
                    createdEmployee = await Employee.create({ ...payload.employee, password: "password" })
                    return createdEmployee
                }
            } catch (error) {
                console.log('error', error);
                return error
            }
        },
        destroyEmployee: async (_, payload, context) => {
            await Employee.findByIdAndDelete(payload.id)
            return payload.id
        },
    }
}

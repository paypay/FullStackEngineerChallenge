import { gql } from "apollo-server-micro";

export const UserType = gql`
  extend type Query {
    users(first: Int, after: ID, orderBy: UserOrderByInput): UserConnection!
  }

  enum UserType {
    ADMIN
    EMPLOYEE
  }

  enum UserOrderByInput {
    ID_ASC
    ID_DESC
  }

  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    userType: UserType!
    avatar: String!
    address: String!
    phone: String!
    mobilePhone: String!
    birthday: Date
    createdAt: Date!
  }

  type UserEdge {
    node: User!
    cursor: ID!
  }

  type UserConnection {
    edges: [UserEdge!]!
    pageInfo: PageInfo
    totalCount: Int
  }
`;

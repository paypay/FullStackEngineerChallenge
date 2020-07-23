import { gql } from "apollo-server-micro";

export const UserType = gql`
  extend type Query {
    user(id: Int!): User!
    users(
      first: Int
      after: ID
      filters: UserFiltersInput
      orderBy: UserOrderByInput
    ): UserConnection!
  }

  extend type Mutation {
    Authenticate(input: AuthenticateInput!): AuthenticatePayload!
  }

  input AuthenticateInput {
    email: String!
    password: String!
  }

  type AuthenticatePayload {
    user: User!
    token: String!
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

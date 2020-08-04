import { gql } from "apollo-server-micro";

export const AssignmentStatus = gql`
  extend type Query {
    assignment(id: Int!): Assignment!
    assignments(
      first: Int
      after: ID
      filters: AssignmentFiltersInput
      orderBy: AssignmentOrderByInput
    ): AssignmentConnection!
  }

  extend type Mutation {
    CreateAssignment(input: CreateAssignmentInput!): CreateAssignmentPayload!
  }

  input AssignmentFiltersInput {
    SEARCH: String
    STATUS: AssignmentStatus
    USER_ID: Int
    REVIEWEE_ID: Int
  }

  type DeleteAssignmentPayload {
    assignment: Assignment!
  }

  input CreateAssignmentInput {
    revieweeId: Int!
    reviewerIds: [Int!]!
  }

  type CreateAssignmentPayload {
    assignments: [Assignment!]!
  }

  enum AssignmentStatus {
    PENDING
    COMPLETED
  }

  enum AssignmentOrderByInput {
    ID_ASC
    ID_DESC
    STATUS_ASC
    STATUS_DESC
  }

  type Assignment {
    id: Int!
    status: AssignmentStatus!
    createdAt: Date!
  }

  type AssignmentEdge {
    node: Assignment!
    cursor: ID!
  }

  type AssignmentConnection {
    edges: [AssignmentEdge!]!
    pageInfo: PageInfo
    totalCount: Int
  }

  extend type User {
    assignments(
      first: Int
      after: ID
      filters: AssignmentFiltersInput
      orderBy: AssignmentOrderByInput
    ): AssignmentConnection!
  }

  extend type Review {
    assignment: Assignment!
  }
`;

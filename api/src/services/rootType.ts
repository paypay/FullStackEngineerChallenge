import { gql } from "apollo-server-micro";

export const rootType = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    firstCursor: ID
    lastCursor: ID
    previousCursor: ID
  }
`;

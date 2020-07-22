import { gql } from "apollo-server-micro";

export const rootType = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

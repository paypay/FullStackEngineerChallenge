import { gql } from "apollo-server-micro";

export const ReviewType = gql`
  extend type Query {
    review(id: Int!): Review!
    reviews(
      first: Int
      after: ID
      orderBy: ReviewOrderByInput
    ): ReviewConnection!
  }

  enum ReviewOrderByInput {
    ID_ASC
    ID_DESC
    RATING_ASC
    RATING_DESC
  }

  type Review {
    id: Int!
    rating: Int!
    comment: String!
    attitude: Int!
    communication: Int!
    growth: Int!
    dependability: Int!
    productivity: Int!
    initiative: Int!
    innovation: Int!
    createdAt: Date!
  }

  type ReviewEdge {
    node: Review!
    cursor: ID!
  }

  type ReviewConnection {
    edges: [ReviewEdge!]!
    pageInfo: PageInfo
    totalCount: Int
  }
`;

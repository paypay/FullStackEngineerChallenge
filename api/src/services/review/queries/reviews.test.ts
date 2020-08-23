import { gql } from "apollo-server-micro";

import { db, setupServer } from "../../../../tests/helpers/setupServer";
import { seed as userSeeds } from "../../../database/seeds/20200722175030_users";
import {
  reviews,
  seed as reviewSeeds,
} from "../../../database/seeds/20200724020753_reviews";

const QUERY_REVIEWS = gql`
  query reviews($first: Int, $after: ID, $orderBy: ReviewOrderByInput) {
    reviews(first: $first, after: $after, orderBy: $orderBy) {
      edges {
        node {
          id
          rating
        }
        cursor
      }
      totalCount
    }
  }
`;

beforeAll(async () => {
  await userSeeds(db);
  await reviewSeeds(db);
});

describe("queries/reviews", () => {
  it("should expose reviews", async () => {
    const { query } = setupServer();
    const { data, errors } = await query({ query: QUERY_REVIEWS });

    expect(errors).toBeUndefined();

    expect(data).toMatchObject({
      reviews: {
        edges: expect.arrayContaining([
          {
            node: {
              id: expect.any(Number),
              rating: expect.any(Number),
            },
            cursor: expect.any(String),
          },
        ]),
        totalCount: reviews.length,
      },
    });
  });

  it("should order reviews", async () => {
    const { query } = setupServer();
    const { data, errors } = await query({
      query: QUERY_REVIEWS,
      variables: { orderBy: "ID_ASC" },
    });

    const firstReview = data && data.reviews && data.reviews.edges[0];

    expect(errors).toBeUndefined();
    expect(firstReview.node.id).toBe(1);
  });
});

import { gql } from "apollo-server-micro";

import { db, setupServer } from "../../../../tests/helpers/setupServer";
import { seed as userSeeds } from "../../../database/seeds/20200722175030_users";
import {
  reviews,
  seed as reviewSeeds,
} from "../../../database/seeds/20200724020753_reviews";
import { getRating } from "../ReviewModel";

const QUERY_REVIEW = gql`
  query review($id: Int!) {
    review(id: $id) {
      id
      rating
    }
  }
`;

beforeAll(async () => {
  await userSeeds(db);
  await reviewSeeds(db);
});

describe("queries/review", () => {
  it("should fetch review by id", async () => {
    const { query } = setupServer();
    const [review] = reviews;
    const { data, errors } = await query({
      query: QUERY_REVIEW,
      variables: { id: 1 },
    });

    expect(errors).toBeUndefined();

    expect(data).toMatchObject({
      review: {
        id: 1,
        rating: getRating(review),
      },
    });
  });
});

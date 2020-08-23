import { gql } from "apollo-server-micro";

import { db, setupServer } from "../../../../tests/helpers/setupServer";
import {
  seed as userSeeds,
  users,
} from "../../../database/seeds/20200722175030_users";

const QUERY_USERS = gql`
  query users($first: Int, $after: ID, $orderBy: UserOrderByInput) {
    users(first: $first, after: $after, orderBy: $orderBy) {
      edges {
        node {
          id
        }
        cursor
      }
      totalCount
    }
  }
`;

beforeAll(async () => {
  await userSeeds(db);
});

describe("queries/users", () => {
  it("should expose users", async () => {
    const { query } = setupServer();
    const { data, errors } = await query({ query: QUERY_USERS });

    expect(errors).toBeUndefined();

    expect(data).toMatchObject({
      users: {
        edges: expect.arrayContaining([
          {
            node: {
              id: expect.any(Number),
            },
            cursor: expect.any(String),
          },
        ]),
        totalCount: users.length,
      },
    });
  });

  it("should order users", async () => {
    const { query } = setupServer();
    const { data, errors } = await query({
      query: QUERY_USERS,
      // By default orderBy is set to be ID_DESC
      variables: { orderBy: "ID_ASC" },
    });

    const firstUser = data && data.users && data.users.edges[0];

    expect(errors).toBeUndefined();
    expect(firstUser.node.id).toBe(1);
  });
});

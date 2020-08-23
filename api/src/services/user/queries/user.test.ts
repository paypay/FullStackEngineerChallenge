import { gql } from "apollo-server-micro";

import { db, setupServer } from "../../../../tests/helpers/setupServer";
import {
  presetUsers,
  seed as userSeeds,
} from "../../../database/seeds/20200722175030_users";

const QUERY_USER = gql`
  query user($id: Int!) {
    user(id: $id) {
      firstName
      lastName
      userType
      avatar
    }
  }
`;

beforeAll(async () => {
  await userSeeds(db);
});

const [adminUser] = presetUsers;

describe("queries/users", () => {
  it("should fetch user by id", async () => {
    const { query } = setupServer();
    const { data, errors } = await query({
      query: QUERY_USER,
      variables: { id: 1 },
    });

    expect(errors).toBeUndefined();

    expect(data).toMatchObject({
      user: {
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        userType: adminUser.userType,
        avatar: adminUser.avatar,
      },
    });
  });
});

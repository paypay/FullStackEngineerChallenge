import { gql } from "apollo-server-micro";

import { db, setupServer } from "../../../../tests/helpers/setupServer";
import { seed as userSeeds } from "../../../database/seeds/users";

const MUTATION_DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    DeleteUser(id: $id) {
      user {
        id
      }
    }
  }
`;

beforeAll(async () => {
  await userSeeds(db);
});

describe("mutations/DeleteUser", () => {
  it("should delete user", async () => {
    const { query } = setupServer();
    const deleteUserId = 5;

    const { data, errors } = await query({
      query: MUTATION_DELETE_USER,
      variables: {
        id: deleteUserId,
      },
    });

    expect(errors).toBeUndefined();

    expect(data).toMatchObject({
      DeleteUser: {
        user: {
          id: deleteUserId,
        },
      },
    });
  });

  it("should fail if user does not exist", async () => {
    const { query } = setupServer();
    const deleteUserId = 999;

    const { errors } = await query({
      query: MUTATION_DELETE_USER,
      variables: {
        id: deleteUserId,
      },
    });

    expect(errors).toMatchObject([
      { message: `User by id: ${deleteUserId} could not be found` },
    ]);
  });
});

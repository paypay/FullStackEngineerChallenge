import { gql } from "apollo-server-micro";

import { db, setupServer } from "../../../../tests/helpers/setupServer";
import { seed as userSeeds, presetUsers } from "../../../database/seeds/users";

const MUTATION_UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $input: UpdateUserInput!) {
    UpdateUser(id: $id, input: $input) {
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

const updateUserData = {
  firstName: "TEST-NAME",
  lastName: "TEST-LAST",
  email: "test@maill.com",
};

beforeAll(async () => {
  await userSeeds(db);
});

describe("mutations/UpdateUser", () => {
  it("should update user", async () => {
    const { query } = setupServer();

    const { data, errors } = await query({
      query: MUTATION_UPDATE_USER,
      variables: {
        id: 2,
        input: updateUserData,
      },
    });

    expect(errors).toBeUndefined();

    expect(data).toMatchObject({
      UpdateUser: {
        user: updateUserData,
      },
    });
  });

  it("should fail if email is already taken", async () => {
    const { query } = setupServer();

    const { errors } = await query({
      query: MUTATION_UPDATE_USER,
      variables: {
        id: 2,
        input: { email: presetUsers[0].email },
      },
    });

    expect(errors).toMatchObject([
      {
        message: "VALIDATION_FAILED",
        fields: { email: "This email address is already being used" },
      },
    ]);
  });

  it("should fail with bad input", async () => {
    const { query } = setupServer();

    const { errors } = await query({
      query: MUTATION_UPDATE_USER,
      variables: {
        id: 2,
        input: { firstName: "ER", lastName: "ER", email: "error@mail.com" },
      },
    });

    expect(errors).toMatchObject([
      {
        message: "VALIDATION_FAILED",
        fields: {
          firstName: "firstName must be at least 3 characters",
          lastName: "lastName must be at least 3 characters",
        },
      },
    ]);
  });
});

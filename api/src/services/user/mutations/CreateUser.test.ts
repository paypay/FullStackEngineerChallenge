import { gql } from "apollo-server-micro";

import { db, setupServer } from "../../../../tests/helpers/setupServer";
import { seed as userSeeds, presetUsers } from "../../../database/seeds/users";

const MUTATION_CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    CreateUser(input: $input) {
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

const newUserData = {
  firstName: "TEST-NAME",
  lastName: "TEST-LAST",
  email: "test@maill.com",
};

beforeAll(async () => {
  await userSeeds(db);
});

describe("mutations/CreateUser", () => {
  it("should create user", async () => {
    const { query } = setupServer();

    const { data, errors } = await query({
      query: MUTATION_CREATE_USER,
      variables: {
        input: newUserData,
      },
    });

    expect(errors).toBeUndefined();

    expect(data).toMatchObject({
      CreateUser: {
        user: newUserData,
      },
    });
  });

  it("should fail if email is already taken", async () => {
    const { query } = setupServer();

    const { errors } = await query({
      query: MUTATION_CREATE_USER,
      variables: {
        input: { ...newUserData, email: presetUsers[1].email },
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
      query: MUTATION_CREATE_USER,
      variables: {
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

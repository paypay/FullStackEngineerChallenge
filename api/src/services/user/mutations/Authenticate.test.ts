import { gql } from "apollo-server-micro";

import { db, setupServer } from "../../../../tests/helpers/setupServer";
import { seed as userSeeds, presetUsers } from "../../../database/seeds/users";

const MUTATION_AUTHENTICATE = gql`
  mutation Authenticate($input: AuthenticateInput!) {
    Authenticate(input: $input) {
      user {
        id
      }
      token
    }
  }
`;

beforeAll(async () => {
  await userSeeds(db);
});

const [adminUser] = presetUsers;

describe("mutations/Authenticate", () => {
  it("should login", async () => {
    const { query } = setupServer();

    const { data, errors } = await query({
      query: MUTATION_AUTHENTICATE,
      variables: {
        input: {
          email: adminUser.email,
          password: "password",
        },
      },
    });

    expect(errors).toBeUndefined();

    expect(data).toMatchObject({
      Authenticate: {
        user: {
          id: expect.any(Number),
        },
        token: expect.any(String),
      },
    });
  });

  it("should fail with bad credentials", async () => {
    const { query } = setupServer();

    const { errors } = await query({
      query: MUTATION_AUTHENTICATE,
      variables: {
        input: {
          email: adminUser.email,
          password: "INCORRECT_PASSWORD",
        },
      },
    });

    expect(errors).toMatchObject([{ message: "Unable to login" }]);
  });
});

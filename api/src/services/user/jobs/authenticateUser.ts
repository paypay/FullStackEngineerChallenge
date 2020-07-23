import bcrypt from "bcrypt";

import db from "../../../database";
import { user as userDB } from "../../../database/types";
import { AuthenticateInput } from "../../../graphql/types";
import generateToken from "../../../helpers/generateToken";
import { FIELDS } from "../UserModel";
import transformer from "../UserTransformer";

const authenticateUser = async ({ email, password }: AuthenticateInput) => {
  const user = await db("user")
    .select<userDB>([...FIELDS, "password"])
    .where("email", "=", email)
    .first();

  if (!user) {
    throw new Error("Unable to login");
  }
  const passwordMatch = await bcrypt.compare(password, user.password!);

  if (!passwordMatch) {
    throw new Error("Unable to login");
  }

  return {
    user: transformer(user),
    token: generateToken(user.id),
  };
};

export default authenticateUser;

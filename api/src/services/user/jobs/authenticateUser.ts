import bcrypt from "bcrypt";

import db from "../../../database";
import { user as userDB } from "../../../database/types";
import { AuthenticateInput } from "../../../graphql/types";
import generateToken from "../../../helpers/generateToken";
import validateSchema from "../../../helpers/validateSchema";
import { FIELDS, validations } from "../UserModel";
import transformer from "../UserTransformer";

const validationSchema = {
  password: validations.password.required(),
  email: validations.email.required(),
};

const authenticateUser = async (input: AuthenticateInput) => {
  await validateSchema(validationSchema, input);

  const { email, password } = input;

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
    token: generateToken(user.id, user.userType),
  };
};

export default authenticateUser;

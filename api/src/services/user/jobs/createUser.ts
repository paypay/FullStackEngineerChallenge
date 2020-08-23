import db from "../../../database";
import { CreateUserInput } from "../../../graphql/types";
import { hashPassword } from "../../../helpers/hashPassword";
import validateSchema from "../../../helpers/validateSchema";
import { FIELDS, validations } from "../UserModel";

const validationSchema = {
  firstName: validations.firstName.required(),
  lastName: validations.lastName.required(),
  password: validations.password.notRequired(),
  email: validations.email
    .required()
    .test("email-unique", "This email address is already being used", (value) =>
      db("user")
        .select(db.raw("1"))
        .where("email", value)
        .first()
        .then((user) => user === undefined)
    ),
  avatar: validations.avatar,
};

const createUser = async (input: CreateUserInput) => {
  await validateSchema(validationSchema, input);

  let password = input.password;

  if (input.password) {
    password = await hashPassword(input.password);
  }

  const [user] = await db("user")
    .insert({ ...input, password })
    .returning(FIELDS);

  return user;
};

export default createUser;
